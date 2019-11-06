import { put, takeLatest, takeEvery, all, call, select } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import StaffService from '../../services/staff';
import CompaniesService from '../../services/companies';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'dashboard';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const fetchActiveStaff = createRequestBound('FETCH_ACTIVE_STAFF');
export const fetchStatistics = createRequestBound('STATISTICS_FETCH');
export const fetchFeedback = createRequestBound('FEEDBACK_FETCH');
export const fetchTop = createRequestBound('TOP_FETCH');

function* getActiveStaffWorker() {
  yield put(fetchActiveStaff.request());
  try {
    const data = yield call(StaffService.getActiveStaff);
    const stats = yield all(
      data
        .filter(({ isManager }) => isManager)
        .map(({ id }) => call(CompaniesService.getManager, id))
    );

    yield put(fetchActiveStaff.success(stats));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchActiveStaff.failure());
  }
}

function* getStatisticsWorker() {
  yield put(fetchStatistics.request());
  try {
    const company = yield select(companiesSelectors.getCurrentCompany);
    const stats = yield call(CompaniesService.getStatistics, company.id);

    yield put(fetchStatistics.success(stats));
  } catch (err) {
    console.error(err);
    yield put(fetchStatistics.failure());
  }
}

function* getFeedbackWorker() {
  yield put(fetchFeedback.request());
  try {
    const feedback = yield call(CompaniesService.getFeedback);

    yield put(fetchFeedback.success(feedback));
  } catch (err) {
    console.error(err);
    yield put(fetchFeedback.failure());
  }
}

function* getTopWorker({ payload: { key } }) {
  // yield put(fetchTop.request());
  try {
    const top = yield call(CompaniesService.getTop, key);

    yield put(fetchTop.success({ [key]: top }));
  } catch (err) {
    console.error(err);
    // yield put(fetchTop.failure());
  }
}

export function* dashboardWatcher() {
  yield all([
    takeLatest(fetchActiveStaff.TRIGGER, getActiveStaffWorker),
    takeLatest(fetchStatistics.TRIGGER, getStatisticsWorker),
    takeLatest(fetchFeedback.TRIGGER, getFeedbackWorker),
    takeEvery(fetchTop.TRIGGER, getTopWorker)
  ]);
}
