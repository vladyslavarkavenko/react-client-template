import { call, put, takeLatest, all, select } from 'redux-saga/effects';
// import i18next from 'i18next';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import Notification from '../../utils/notifications';
import StaffService from '../../services/staff';
import ShareOpinionService from '../../services/shareOpinion';
import { ROLES } from '../../utils/constants';
import staffSelectors from './staffSelectors';
import { validateInviteStaffRow } from '../../utils/validator';

export const prefix = 'staff';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchStaffTables = createRequestBound('TABLES_FETCH');

export const fetchPendingTable = createRequestBound('PENDING_FETCH');

export const pushSendInvitations = createRequestBound('INVITATIONS_SEND');

export const saveTableField = createOnlyTriggerBound('FIELD_SAVE');
export const changeTableRole = createOnlyTriggerBound('ROLE_CHANGE');
export const changeTableTopic = createOnlyTriggerBound('TOPIC_CHANGE');

function* staffTablesWorker() {
  yield put(fetchStaffTables.request());
  try {
    const [pending, active, subjects] = yield all([
      call(StaffService.getPendingStaff),
      call(StaffService.getActiveStaff),
      call(ShareOpinionService.getAllowedSubjects)
    ]);

    console.log(pending, active, subjects);

    yield put(fetchStaffTables.success({ pending, active, subjects }));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStaffTables.failure());
  }
}

function* createStaffTask({ fields, topics, tempId }) {
  try {
    const user = yield call(StaffService.sendInvite, fields);
    let createdTopics = [];

    console.log(user);

    //TODO: Catch error in forked saga
    if (!user.id) {
      return { _isFail: true, _message: user };
    }

    if (topics.length) {
      createdTopics = yield call(StaffService.setTopicsPermission, {
        staff: user.id,
        topics: topics.map((topic) => topic.value)
      });
    }

    return { user, createdTopics, tempId };
  } catch (err) {
    console.log('ERROR');
    console.log(err);
    Notification.error(err);
    return null;
  }
}

function* staffInvitationsWorker() {
  yield put(pushSendInvitations.request());
  try {
    const selectedRows = yield select(staffSelectors.getOnlyCheckedRows, 'invitations');

    const { errors, isValid } = validateInviteStaffRow(selectedRows);

    if (isValid) {
      const tasks = selectedRows.map((item) => {
        const { email, firstName, lastName, topics, roles, id } = item;
        const fields = {
          userData: { email, firstName, lastName },
          isManager: roles.includes(ROLES.MANAGER),
          isAnalyst: roles.includes(ROLES.ANALYST),
          isAdmin: roles.includes(ROLES.ADMIN)
        };

        return call(createStaffTask, { fields, topics, tempId: id });
      });

      const resolvedTasks = yield all(tasks);

      // const result = yield join(onlySuccessTasks);

      console.log(tasks);
      console.log(resolvedTasks);

      const onlySuccess = resolvedTasks.filter((item) => {
        if (item._isFail) {
          Notification.error(item._message);
          return false;
        }

        return true;
      });
      // console.log(onlySuccessTasks);
      // console.log(result);

      yield put(pushSendInvitations.success(onlySuccess));
    } else {
      console.log(errors);
      yield put(pushSendInvitations.failure(errors));
    }
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushSendInvitations.failure());
  }
}

export function* staffWatcher() {
  yield all([
    takeLatest(fetchStaffTables.TRIGGER, staffTablesWorker),
    takeLatest(pushSendInvitations.TRIGGER, staffInvitationsWorker)
  ]);
}
