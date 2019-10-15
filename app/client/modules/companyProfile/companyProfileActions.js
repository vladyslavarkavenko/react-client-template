import { put, takeLatest, all, call } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import CompaniesService from '../../services/companies';
import parseRadarScores from '../helpers/parseRadarScores';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

export const prefix = 'companyProfile';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const fetchTopScores = createRequestBound('TOP_SCORES_FETCH');
export const fetchStatistics = createRequestBound('STATISTICS_FETCH');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getRadarScoresWorker({ payload }) {
  yield put(fetchRadarScores.request());
  try {
    const scores = yield call(CompaniesService.getRadarScores, payload);

    yield call(CompaniesService.getStatistics, payload);

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
    const scores = yield call(CompaniesService.getTopScores, payload);

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
    const stats = yield call(CompaniesService.getStatistics, payload);

    yield put(fetchStatistics.success(stats));
  } catch (err) {
    console.error(err);
    yield put(fetchStatistics.failure());
  }
}

export function* companyProfileWatcher() {
  yield all([
    takeLatest(fetchRadarScores.TRIGGER, getRadarScoresWorker),
    takeLatest(fetchTopScores.TRIGGER, getTopScoresWorker),
    takeLatest(fetchStatistics.TRIGGER, getStatisticsWorker)
  ]);
}
