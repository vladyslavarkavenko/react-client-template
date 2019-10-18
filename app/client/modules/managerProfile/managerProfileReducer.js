import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './managerProfileActions';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';

import { PROPS } from '../../components/widgets/radar/const';

const { emptyData } = PROPS;

const radarStatus = makeStatusWithResetReducer(actions.fetchRadarScores, actions.clearAll.TRIGGER);

const radarData = handleActions(
  {
    [actions.fetchRadarScores.SUCCESS](state, { payload }) {
      return payload || emptyData;
    },
    [actions.clearAll.TRIGGER]() {
      return emptyData;
    }
  },
  emptyData
);

const radar = combineReducers({
  status: radarStatus,
  data: radarData
});

const topScoresStatus = makeStatusWithResetReducer(
  actions.fetchTopScores,
  actions.clearAll.TRIGGER
);

const topScoresData = handleActions(
  {
    [actions.fetchTopScores.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const topScores = combineReducers({
  status: topScoresStatus,
  data: topScoresData
});

const statsStatus = makeStatusWithResetReducer(actions.fetchStatistics, actions.clearAll.TRIGGER);

const managerStatsData = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload.managerStats;
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    }
  },
  {}
);

const companyStatsData = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload.companyStats;
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    }
  },
  {}
);

const stats = combineReducers({
  status: statsStatus,
  manager: managerStatsData,
  company: companyStatsData
});

const managerProfile = combineReducers({
  radar,
  topScores,
  stats
});

export default managerProfile;
