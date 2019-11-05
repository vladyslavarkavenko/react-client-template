import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './managerProfileActions';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';

import { PROPS } from '../../components/widgets/radar/const';

const { emptyData } = PROPS;

const managerStatus = makeStatusWithResetReducer(actions.fetchUserData, actions.clearAll.TRIGGER);

const managerData = handleActions(
  {
    [actions.fetchUserData.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    }
  },
  null
);

const manager = combineReducers({
  status: managerStatus,
  data: managerData
});

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

const commentsStatus = makeStatusWithResetReducer(actions.fetchComments, actions.clearAll.TRIGGER);

const commentsData = handleActions(
  {
    [actions.fetchComments.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const status = makeStatusWithResetReducer(actions.fetchAll, actions.clearAll.TRIGGER);

const comments = combineReducers({
  status: commentsStatus,
  data: commentsData
});

const managerProfile = combineReducers({
  status,
  manager,
  radar,
  topScores,
  stats,
  comments
});

export default managerProfile;
