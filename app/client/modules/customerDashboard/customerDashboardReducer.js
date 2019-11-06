import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './customerDashboardActions';
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

const radarSelected = handleActions(
  {
    [actions.fetchManagers.SUCCESS]() {
      return null;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    }
  },
  null
);

const radar = combineReducers({
  status: radarStatus,
  data: radarData,
  selected: radarSelected
});

const managers = handleActions(
  {
    [actions.fetchManagers.SUCCESS](state, { payload }) {
      return payload.managers;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const companies = handleActions(
  {
    [actions.fetchManagers.SUCCESS](state, { payload }) {
      return payload.companies;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const list = combineReducers({
  status: makeStatusWithResetReducer(actions.fetchManagers, actions.clearAll.TRIGGER),
  managers,
  companies
});

const status = makeStatusWithResetReducer(actions.fetchAll, actions.clearAll.TRIGGER);

const customerDashboard = combineReducers({
  status,
  radar,
  list
});

export default customerDashboard;
