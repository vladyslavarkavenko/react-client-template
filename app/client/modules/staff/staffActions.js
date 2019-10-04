import { call, put, takeLatest, all, select, fork } from 'redux-saga/effects';
// import i18next from 'i18next';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import Notification from '../../utils/notifications';
import StaffService from '../../services/staff';
import ShareOpinionService from '../../services/shareOpinion';
import { ROLES } from '../../utils/constants';
import staffSelectors from './staffSelectors';

export const prefix = 'staff';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchStaffTables = createRequestBound('TABLES_FETCH');
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

function* createStaffTask({ fields, topics }) {
  try {
    const user = yield call(StaffService.sendInvite, fields);
    let createdTopics = [];

    if (topics.length) {
      createdTopics = yield call(StaffService.setTopicsPermission, {
        staff: user.id,
        topics: topics.map((topic) => topic.value)
      });
    }

    yield { user, createdTopics };
  } catch (err) {
    console.error(err);
  }
}

function* staffInvitationsWorker() {
  yield put(pushSendInvitations.request());
  try {
    const selectedRows = yield select(staffSelectors.getOnlyCheckedRows, 'invitations');

    // add validation

    const tasks = selectedRows.map((item) => {
      const { email, firstName, lastName, topics, roles } = item;
      const fields = {
        userData: { email, firstName, lastName },
        isManager: roles.includes(ROLES.MANAGER),
        isAnalyst: roles.includes(ROLES.ANALYST),
        isAdmin: roles.includes(ROLES.ADMIN)
      };

      return fork(createStaffTask, { fields, topics });
    });

    const resolved = yield all(tasks);

    console.log(resolved);
    yield put(pushSendInvitations.success(resolved));
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
