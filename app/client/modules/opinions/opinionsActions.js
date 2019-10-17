import { put, takeLatest, all, select } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import StaffService from '../../services/staff';
import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'opinions';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const fetchStaffStatistics = createRequestBound('STAFF_STATISTICS_FETCH');

function parseData(data, stats) {
  console.log('stats', stats, 'data', data);
  const newStats = {};
  data.forEach(({ manager: { id } }, i) => {
    newStats[id] = stats[i];
  });
  return newStats;
}

function* staffStatisticsWorker() {
  yield put(fetchStaffStatistics.request());
  try {
    const data = yield select(companiesSelectors.getCompaniesForActiveRole);
    const stats = yield all(data.map(({ manager: { id } }) => StaffService.getStaffStatistics(id)));

    yield put(fetchStaffStatistics.success(parseData(data, stats)));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStaffStatistics.failure());
  }
}

export function* staffStatisticsWatcher() {
  yield all([takeLatest(fetchStaffStatistics.TRIGGER, staffStatisticsWorker)]);
}
