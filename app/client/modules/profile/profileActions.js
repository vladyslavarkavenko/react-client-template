import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import parseRadarScores from '../helpers/parseRadarScores';
import ManagerService from '../../services/manager';
import Notification from '../../utils/notifications';
import createRequestRoutine from '../helpers/createRequestRoutine';
import authSelectors from '../auth/authSelectors';

export const prefix = 'profile';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const getRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const getSatisfiedClients = createRequestBound('SATISFIED_CLIENTS_FETCH');

function* getRadarScoresWorker() {
  yield put(getRadarScores.request());

  try {
    const user = yield select(authSelectors.user);
    const res = yield call(() => ManagerService.getRadarScores(user.staffId));

    yield put(getRadarScores.success(parseRadarScores(res)));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(getRadarScores.failure());
  }
}

export function* profileWatcher() {
  yield all([takeLatest(getRadarScores.TRIGGER, getRadarScoresWorker)]);
}
