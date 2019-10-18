import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import ManagerService from '../../services/manager';
import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import parseRadarScores from '../helpers/parseRadarScores';
import CompaniesService from '../../services/companies';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'managerProfile';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const fetchTopScores = createRequestBound('TOP_SCORES_FETCH');
export const fetchStatistics = createRequestBound('STATISTICS_FETCH');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getRadarScoresWorker({ payload }) {
  yield put(fetchRadarScores.request());
  try {
    const scores = yield call(ManagerService.getRadarScores, payload);

    const data = parseRadarScores(scores);

    yield put(fetchRadarScores.success(data));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchRadarScores.failure());
  }
}

function* getTopScoresWorker({ payload }) {
  yield put(fetchTopScores.request());
  try {
    const scores = yield call(ManagerService.getTopScores, payload);

    yield put(fetchTopScores.success(scores));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchTopScores.failure());
  }
}

function* getStatisticsWorker({ payload }) {
  yield put(fetchStatistics.request());
  try {
    const { id } = yield select(companiesSelectors.findCompanyByManager, payload);
    const [managerStats, companyStats] = yield all([
      call(ManagerService.getStatistics, payload),
      call(CompaniesService.getStatistics, id)
    ]);

    yield put(fetchStatistics.success({ managerStats, companyStats }));
  } catch (err) {
    console.error(err);
    yield put(fetchStatistics.failure());
  }
}

export function* managerProfileWatcher() {
  yield all([
    takeLatest(fetchRadarScores.TRIGGER, getRadarScoresWorker),
    takeLatest(fetchTopScores.TRIGGER, getTopScoresWorker),
    takeLatest(fetchStatistics.TRIGGER, getStatisticsWorker)
  ]);
}
