import { put, takeLatest, all, call } from 'redux-saga/effects';

import Notification from '../../utils/notifications';
import createRequestRoutine from '../helpers/createRequestRoutine';
import CompaniesService from '../../services/companies';
import parseRadarScores from '../helpers/parseRadarScores';

export const prefix = 'companyProfile';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const getRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const getSatisfiedClients = createRequestBound('SATISFIED_CLIENTS_FETCH');

function* getRadarScoresWorker({ payload }) {
  yield put(getRadarScores.request());
  try {
    const scores = yield call(CompaniesService.getRadarScores, payload);

    const data = parseRadarScores(scores);

    yield put(getRadarScores.success(data));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(getRadarScores.failure());
  }
}

function* getSatisfiedClientsWorker({ payload }) {
  yield put(getSatisfiedClients.request());
  try {
    const { avgSatisfaction } = yield call(CompaniesService.getSatisfiedClients, payload);

    yield put(getSatisfiedClients.success(avgSatisfaction));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(getSatisfiedClients.failure());
  }
}

export function* companyProfileWatcher() {
  yield all([
    takeLatest(getRadarScores.TRIGGER, getRadarScoresWorker),
    takeLatest(getSatisfiedClients.TRIGGER, getSatisfiedClientsWorker)
  ]);
}
