import { put, takeLatest, all, call } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import StaffService from '../../services/staff';

export const prefix = 'dashboard';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const fetchActiveStaff = createRequestBound('FETCH_ACTIVE_STAFF');

function* getActiveStaffWorker() {
  yield put(fetchActiveStaff.request());
  try {
    const data = yield call(StaffService.getActiveStaff);
    // const stats = yield all(data.map(({ id }) => StaffService.getStaffStatistics(id)));

    yield put(fetchActiveStaff.success(data));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchActiveStaff.failure());
  }
}

export function* dashboardWatcher() {
  yield all([takeLatest(fetchActiveStaff.TRIGGER, getActiveStaffWorker)]);
}
