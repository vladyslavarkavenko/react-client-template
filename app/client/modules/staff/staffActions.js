import { call, put, takeLatest, all, select } from 'redux-saga/effects';
// import i18next from 'i18next';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import Notification from '../../utils/notifications';
import StaffService from '../../services/staff';
import ShareOpinionService from '../../services/shareOpinion';
import { ROLES, STAFF_TABLE_STATUS, STAFF_TABLE_TYPE } from '../../utils/constants';
import staffSelectors from './staffSelectors';
import { validateInviteStaffRow } from '../../utils/validator';
import { normalizeUserData, normalizeTopics } from './staffHelpers';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'staff';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchStaffTables = createRequestBound('TABLES_FETCH');

export const fetchPendingTable = createRequestBound('PENDING_FETCH');

export const pushSendInvitations = createRequestBound('INVITATIONS_SEND');
export const pushResendInvitations = createRequestBound('INVITATIONS_RESEND');

export const saveTableField = createOnlyTriggerBound('FIELD_SAVE');
export const selectAllRows = createOnlyTriggerBound('ALL_ROWS_SELECT');
export const changeTableRole = createOnlyTriggerBound('ROLE_CHANGE');
export const changeTableTopic = createOnlyTriggerBound('TOPIC_CHANGE');

function* staffTablesWorker() {
  yield put(fetchStaffTables.request());
  try {
    const [pendingData, activeData, subjects] = yield all([
      call(StaffService.getPendingStaff),
      call(StaffService.getActiveStaff),
      call(ShareOpinionService.getAllowedSubjects)
    ]);

    const t0 = window.performance.now();

    const subjectsFlatten = normalizeTopics(subjects);

    const pending = pendingData.map((userData) => normalizeUserData(userData, subjectsFlatten));

    const active = activeData.map((userData) =>
      normalizeUserData(userData, subjectsFlatten, STAFF_TABLE_STATUS.ACTIVE)
    );

    console.log('TIMING:', window.performance.now() - t0);
    yield put(fetchStaffTables.success({ pending, active, subjects, subjectsFlatten }));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStaffTables.failure());
  }
}

function* createStaffTask({ fields, topics, tempId }) {
  try {
    const user = yield call(StaffService.sendInvite, fields);
    const topicsId = topics.map((topic) => topic.value);

    if (topics.length) {
      yield call(StaffService.setTopicsPermission, {
        staff: user.id,
        topics: topicsId
      });
    }

    user.topics = topicsId;
    user.tempId = tempId;

    return user;
  } catch (err) {
    Notification.error(
      `Failed to send invitation to ${fields.userData.firstName} ${fields.userData.lastName}`
    );
    return null;
  }
}

function* staffInvitationsWorker() {
  yield put(pushSendInvitations.request());
  try {
    const selectedRows = yield select(
      staffSelectors.getOnlyCheckedRows,
      STAFF_TABLE_TYPE.INVITATIONS
    );

    const company = yield select(companiesSelectors.getCurrentCompany);

    const { errors, isValid } = validateInviteStaffRow(selectedRows, company.hasAllAccess);

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

      const onlySuccess = resolvedTasks.filter((item) => item !== null);

      const subjectsFlatten = yield select(staffSelectors.subjectListNormalized);
      const normalized = onlySuccess.map((user) => ({
        ...normalizeUserData(user, subjectsFlatten, STAFF_TABLE_STATUS.PENDING),
        tempId: user.tempId
      }));
      // console.log(onlySuccessTasks);
      // console.log(result);

      Notification.success('Invitations has been sent');
      yield put(pushSendInvitations.success(normalized));
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

function* staffResendWorker() {
  const selectedRows = yield select(staffSelectors.getTableChecked, STAFF_TABLE_TYPE.PENDING);

  if (selectedRows.length) {
    yield put(pushResendInvitations.request());
    try {
      yield call(StaffService.resendInvite, {
        emails: selectedRows.map((row) => row.email)
      });

      Notification.success('Invitations has been resent');
      yield put(pushResendInvitations.success(selectedRows));
    } catch (err) {
      Notification.error(err);
      yield put(pushResendInvitations.failure());
    }
  }
}

export function* staffWatcher() {
  yield all([
    takeLatest(fetchStaffTables.TRIGGER, staffTablesWorker),
    takeLatest(pushSendInvitations.TRIGGER, staffInvitationsWorker),
    takeLatest(pushResendInvitations.TRIGGER, staffResendWorker)
  ]);
}
