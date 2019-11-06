import { put, takeLatest, all, call } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import ManagerService from '../../services/manager';
import CompanyService from '../../services/companies';
import { ROUTING_PARAMS, RATE_PROFILE_TYPE } from '../../utils/constants';
import parseRadarScores from '../helpers/parseRadarScores';

// Helpers
function formatProfile(profile) {
  const {
    userData: { id, avatar, name, location },
    avgSatisfaction,
    numberOpinions
  } = profile;

  return {
    id,
    type: RATE_PROFILE_TYPE.MANAGER,
    avatar: avatar || '/assets/img/empty-avatar.jpg',
    avgSatisfaction,
    name,
    location,
    numberOpinions
  };
}

export const prefix = 'compare';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const fetchCompareData = createRequestBound('FETCH_COMPARE_DATA');

function* getCompareDataWorker({ payload: { type, mainId, compareId } }) {
  yield put(fetchCompareData.request());

  const main = {
    radar: undefined,
    profile: undefined
  };
  const compare = {
    radar: undefined,
    profile: undefined
  };

  try {
    switch (type) {
      case ROUTING_PARAMS.MANAGER: {
        // TODO: Replace with working endpoint.
        const [mainProfile, compareProfile] = yield all([
          call(CompanyService.getManager, mainId),
          call(CompanyService.getManager, compareId)
        ]);

        main.profile = formatProfile(mainProfile);
        compare.profile = formatProfile(compareProfile);

        const [mainScores, compareScores] = yield all([
          call(ManagerService.getRadarScores, mainId),
          call(ManagerService.getRadarScores, compareId)
        ]);

        main.radar = {
          data: parseRadarScores(mainScores),
          detailsData: { type, id: mainId }
        };
        compare.radar = {
          data: parseRadarScores(compareScores),
          detailsData: { type, id: compareId }
        };

        break;
      }
      case ROUTING_PARAMS.COMPANY: {
        [main.radar, compare.radar] = yield all([
          call(CompanyService.getRadarScores, mainId),
          call(CompanyService.getRadarScores, compareId)
        ]);
        // TODO: Replace with working endpoint.
        // [main.profile, compare.profile] = yield all([
        //   call(CompanyService.getProfile, mainId),
        //   call(CompanyService.getProfile, compareId)
        // ]);

        break;
      }
      default:
        break;
    }

    yield put(fetchCompareData.success({ main, compare }));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchCompareData.failure());
  }
}

export function* compareWatcher() {
  yield all([takeLatest(fetchCompareData.TRIGGER, getCompareDataWorker)]);
}
