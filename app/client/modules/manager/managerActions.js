import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import parseData from './helpers/parseData';
import ManagerService from '../../services/manager';
import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';
import createRequestRoutine from '../helpers/createRequestRoutine';

export const prefix = 'manager';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const getRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const getSatisfiedClients = createRequestBound('SATISFIED_CLIENTS_FETCH');

function* getRadarScoresWorker() {
  yield put(getRadarScores.request());

  try {
    const manager = yield select(companiesSelectors.getCurrentManager);
    const res = yield call(() => ManagerService.getRadarScores(manager.id));

    yield put(getRadarScores.success(parseData(res)));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(getRadarScores.failure());
  }
}

function* getSatisfiedClientsWorker() {
  yield put(getSatisfiedClients.request());

  try {
    const manager = yield select(companiesSelectors.getCurrentManager);
    const res = yield call(() => ManagerService.getSatisfiedClients(manager.id));

    yield put(getSatisfiedClients.success(res.avgSatisfaction));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(getSatisfiedClients.failure());
  }
}

export function* managerWatcher() {
  yield all([
    takeLatest(getRadarScores.TRIGGER, getRadarScoresWorker),
    takeLatest(getSatisfiedClients.TRIGGER, getSatisfiedClientsWorker)
  ]);
}
