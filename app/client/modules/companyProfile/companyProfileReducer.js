import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './companyProfileActions';
import { makeStatusReducer } from '../../utils/reduxHelpers';

import { PROPS } from '../../pages/profile/overview/const';

const { emptyData } = PROPS;

const radarStatus = makeStatusReducer(actions.fetchRadarScores);

const radarData = handleActions(
  {
    [actions.fetchRadarScores.SUCCESS](state, { payload }) {
      return payload || emptyData;
    }
  },
  emptyData
);

const radar = combineReducers({
  status: radarStatus,
  data: radarData
});

const topScoresStatus = makeStatusReducer(actions.fetchTopScores);

const topScoresData = handleActions(
  {
    [actions.fetchTopScores.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  []
);

const topScores = combineReducers({
  status: topScoresStatus,
  data: topScoresData
});

const companyProfile = combineReducers({
  radar,
  topScores
});

export default companyProfile;
