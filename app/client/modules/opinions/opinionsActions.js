import { put, takeLatest, all, select } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import StaffService from '../../services/staff';
import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';
import CompaniesService from '../../services/companies';

export const prefix = 'opinions';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const fetchStaffStatistics = createRequestBound('STAFF_STATISTICS_FETCH');
export const fetchCompaniesStatistics = createRequestBound('COMPANY_STATISTICS_FETCH');

function parseData(data, stats) {
  const newStats = {};
  data.forEach(({ id }, i) => {
    newStats[id] = stats[i];
  });

  return newStats;
}

function* staffStatisticsWorker() {
  yield put(fetchStaffStatistics.request());
  try {
    const managerList = yield select(companiesSelectors.getManagersList);
    const stats = yield all(managerList.map(({ id }) => StaffService.getStaffStatistics(id)));

    yield put(fetchStaffStatistics.success(parseData(managerList, stats)));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStaffStatistics.failure());
  }
}

function* companyStatisticsWorker() {
  yield put(fetchCompaniesStatistics.request());
  try {
    const companyList = yield select(companiesSelectors.getCompaniesForActiveRole);
    const stats = yield all(companyList.map(({ id }) => CompaniesService.getStatistics(id)));

    yield put(fetchCompaniesStatistics.success(parseData(companyList, stats)));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchCompaniesStatistics.failure());
  }
}

export function* staffStatisticsWatcher() {
  yield all([
    takeLatest(fetchStaffStatistics.TRIGGER, staffStatisticsWorker),
    takeLatest(fetchCompaniesStatistics.TRIGGER, companyStatisticsWorker)
  ]);
}
