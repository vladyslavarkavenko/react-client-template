import { call, put, takeLatest, all, select } from 'redux-saga/effects';
// import i18next from 'i18next';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import Notification from '../../utils/notifications';
import StaffService from '../../services/staff';
import ShareOpinionService from '../../services/shareOpinion';
import { ROLES, STAFF_TABLE_STATUS, STAFF_TABLE_TYPE } from '../../utils/constants';
import staffSelectors from './staffSelectors';
import { validateInviteStaffRow, validateUpdateStaffRow } from '../../utils/validator';

import normalizeUserData from './helpers/normalizeUserData';
import sortUserRowsByDate from './helpers/sortUserRowsByDate';

import companiesSelectors from '../companies/companiesSelectors';
import authSelectors from '../auth/authSelectors';

export const prefix = 'staff';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchStaffTables = createRequestBound('TABLES_FETCH');

export const pushSendInvitations = createRequestBound('INVITATIONS_SEND');
export const pushResendInvitations = createRequestBound('INVITATIONS_RESEND');

export const setUsersStatus = createRequestBound('USER_STATUS_SET');
export const pushUsersChanges = createRequestBound('USER_CHANGES_PUSH');

export const saveTableField = createOnlyTriggerBound('FIELD_SAVE');
export const createNewRow = createOnlyTriggerBound('NEW_ROW_CREATE');
export const selectAllRows = createOnlyTriggerBound('ALL_ROWS_SELECT');
export const changeTableRole = createOnlyTriggerBound('ROLE_CHANGE');
export const changeTableSubject = createOnlyTriggerBound('TOPIC_CHANGE');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* staffTablesWorker() {
  yield put(fetchStaffTables.request());
  try {
    const [pendingData, activeData, subjects] = yield all([
      call(StaffService.getPendingStaff),
      call(StaffService.getActiveStaff),
      call(ShareOpinionService.getAllowedSubjects)
    ]);

    const pending = pendingData
      .map((userData) => normalizeUserData(userData, subjects))
      .sort(sortUserRowsByDate);

    const currentUser = yield select(authSelectors.user);
    const active = activeData
      .filter((userData) => userData.id !== currentUser.staffId)
      .map((userData) => normalizeUserData(userData, subjects, STAFF_TABLE_STATUS.ACTIVE))
      .sort(sortUserRowsByDate);

    yield put(fetchStaffTables.success({ pending, active, subjects }));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStaffTables.failure());
  }
}

function* createStaffTask({ fields, subjects, tempId }) {
  try {
    const user = yield call(StaffService.sendInvite, fields);
    const subjectsId = subjects.map((subject) => subject.id);

    if (subjects.length) {
      yield call(StaffService.setTopicsPermission, {
        staff: String(user.id),
        subjects: subjectsId
      });
    }

    user.subjects = subjectsId;
    user.tempId = tempId;

    Notification.success(
      `Invitations has been sent to ${fields.userData.firstName} ${fields.userData.lastName}`
    );

    return user;
  } catch (err) {
    Notification.error(err);
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
        const { email, firstName, lastName, subjects, roles, id } = item;
        const fields = {
          userData: { email, firstName, lastName },
          isManager: roles.includes(ROLES.MANAGER),
          isAnalyst: roles.includes(ROLES.ANALYST),
          isAdmin: roles.includes(ROLES.ADMIN)
        };

        return call(createStaffTask, { fields, subjects, tempId: id });
      });

      const resolvedTasks = yield all(tasks);

      const onlySuccess = resolvedTasks.filter((item) => item !== null);

      const subjects = yield select(staffSelectors.subjectList);

      const normalized = onlySuccess.map((user) => ({
        ...normalizeUserData(user, subjects, STAFF_TABLE_STATUS.PENDING),
        tempId: user.tempId
      }));

      yield put(pushSendInvitations.success(normalized));
    } else {
      console.error(errors);
      yield put(pushSendInvitations.failure(errors));
    }
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushSendInvitations.failure());
  }
}

function* staffResendWorker() {
  const selectedRows = yield select(staffSelectors.getOnlyCheckedRows, STAFF_TABLE_TYPE.PENDING);

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

function* updateStaffTask({ fields, subjects, id, originalUser }) {
  try {
    const { firstName, lastName } = originalUser;
    const subjectsId = subjects.map((topic) => topic.id);
    let user = originalUser;

    if (Object.keys(fields).length) {
      // returns CompanyStaff model its ok because of normalization after
      user = yield call(StaffService.updateUser, { userId: id, data: fields });
    }

    yield call(StaffService.setTopicsPermission, {
      staff: String(id),
      subjects: subjectsId
    });
    // attach subjects to model then normalize
    user.subjects = subjectsId;

    Notification.success(`User ${firstName} ${lastName} has been updated`);

    return user;
  } catch (err) {
    console.error(err);
    Notification.error(err);
    return null;
  }
}

function* staffUpdateWorker() {
  yield put(pushUsersChanges.request());
  try {
    const selectedRows = yield select(staffSelectors.getOnlyChangedRows, 'active');

    const company = yield select(companiesSelectors.getCurrentCompany);
    //check only roles field
    const { errors, isValid } = validateUpdateStaffRow(selectedRows, company.hasAllAccess);

    if (isValid) {
      const tasks = selectedRows.map((item) => {
        const { id, _changes } = item;
        const { subjects = [], roles } = _changes;
        const fields = {};

        if (roles) {
          fields.isManager = roles.includes(ROLES.MANAGER);
          fields.isAnalyst = roles.includes(ROLES.ANALYST);
          fields.isAdmin = roles.includes(ROLES.ADMIN);
        }

        return call(updateStaffTask, { fields, subjects, id, originalUser: item });
      });

      const resolvedTasks = yield all(tasks);

      const onlySuccess = resolvedTasks.filter((item) => item !== null);

      const subjects = yield select(staffSelectors.subjectList);

      const normalized = onlySuccess.map((user) =>
        normalizeUserData(user, subjects, STAFF_TABLE_STATUS.ACTIVE)
      );

      const updatedUsers = {};

      normalized.forEach((user) => {
        updatedUsers[user.id] = user;
      });

      yield put(pushUsersChanges.success(updatedUsers));
    } else {
      yield put(pushUsersChanges.failure(errors));
    }
  } catch (err) {
    console.error(err);
    yield put(pushUsersChanges.failure());
  }
}

function* unblockStaffTask({ id, originalUser }) {
  try {
    const { firstName, lastName } = originalUser;
    const user = { ...originalUser, roles: [ROLES.MANAGER] };

    yield call(StaffService.updateUser, {
      userId: id,
      data: {
        isManager: true
      }
    });
    Notification.success(`User ${firstName} ${lastName} has been unblocked`);
    return user;
  } catch (err) {
    Notification.error(`Failed to unblock ${originalUser.firstName} ${originalUser.lastName}`);
    return null;
  }
}

function* blockStaffTask({ id, originalUser }) {
  try {
    const { firstName, lastName } = originalUser;
    const user = { ...originalUser, roles: [] };

    yield call(StaffService.blockUser, id);

    Notification.success(`User ${firstName} ${lastName} has been blocked`);
    return user;
  } catch (err) {
    Notification.error(`Failed to block ${originalUser.firstName} ${originalUser.lastName}`);
    return null;
  }
}

function* staffStatusWorker({ payload }) {
  yield put(setUsersStatus.request());
  try {
    const { status } = payload;
    const checkedRows = yield select(staffSelectors.getOnlyCheckedRows, 'active');
    const selectedRows = checkedRows.filter((row) => {
      if (status === STAFF_TABLE_STATUS.BLOCKED) {
        //select only active users;
        return row.roles.length !== 0;
      }

      //select only blocked users;
      return row.roles.length === 0;
    });

    if (selectedRows.length) {
      const tasks = selectedRows.map((item) => {
        const { id } = item;

        if (status === STAFF_TABLE_STATUS.BLOCKED) {
          return call(blockStaffTask, { id, originalUser: item });
        }

        return call(unblockStaffTask, { id, originalUser: item });
      });

      const resolvedTasks = yield all(tasks);

      const onlySuccess = resolvedTasks.filter((item) => item !== null);

      const subjects = yield select(staffSelectors.subjectList);

      const normalized = onlySuccess.map((user) => normalizeUserData(user, subjects, status));

      const updatedUsers = {};

      normalized.forEach((user) => {
        updatedUsers[user.id] = user;
      });

      yield put(pushUsersChanges.success(updatedUsers));
    } else {
      yield put(setUsersStatus.failure());
    }
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(setUsersStatus.failure());
  }
}

export function* staffWatcher() {
  yield all([
    takeLatest(fetchStaffTables.TRIGGER, staffTablesWorker),
    takeLatest(pushSendInvitations.TRIGGER, staffInvitationsWorker),
    takeLatest(pushResendInvitations.TRIGGER, staffResendWorker),
    takeLatest(pushUsersChanges.TRIGGER, staffUpdateWorker),
    takeLatest(setUsersStatus.TRIGGER, staffStatusWorker)
  ]);
}
