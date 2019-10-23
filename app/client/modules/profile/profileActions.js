import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import parseRadarScores from '../helpers/parseRadarScores';
import ManagerService from '../../services/manager';
import Notification from '../../utils/notifications';
import createRequestRoutine from '../helpers/createRequestRoutine';
import authSelectors from '../auth/authSelectors';

import { ROLES, RATE_PROFILE_TYPE } from '../../utils/constants';
import companiesSelectors from '../companies/companiesSelectors';
import CompaniesService from '../../services/companies';

const { MANAGER } = ROLES;

export const prefix = 'profile';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const getRadarScores = createRequestBound('RADAR_SCORES_FETCH');

function* getRadarScoresWorker() {
  yield put(getRadarScores.request());

  try {
    const activeRole = yield select(authSelectors.activeRole);

    let res;
    let detailsData;
    let avgSatisfaction;
    if (activeRole === MANAGER) {
      const user = yield select(authSelectors.user);

      // eslint-disable-next-line prefer-destructuring
      avgSatisfaction = user.avgSatisfaction;
      detailsData = {
        id: user.staffId,
        type: RATE_PROFILE_TYPE.MANAGER
      };
      res = yield call(() => ManagerService.getRadarScores(user.staffId));
    } else {
      const company = yield select(companiesSelectors.getCurrentCompany);

      // eslint-disable-next-line prefer-destructuring
      avgSatisfaction = company.avgSatisfaction;
      detailsData = {
        id: company.id,
        type: RATE_PROFILE_TYPE.COMPANY
      };
      res = yield call(() => CompaniesService.getRadarScores(company.id));
    }

    yield put(
      getRadarScores.success({
        detailsData,
        avgSatisfaction,
        ...parseRadarScores(res)
      })
    );
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(getRadarScores.failure());
  }
}

export function* profileWatcher() {
  yield all([takeLatest(getRadarScores.TRIGGER, getRadarScoresWorker)]);
}
