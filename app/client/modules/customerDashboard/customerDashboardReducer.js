import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { ROUTING_PARAMS } from '../../utils/constants';
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

const radarOptions = handleActions(
  {
    [actions.fetchManagers.SUCCESS](state, { payload }) {
      const options = payload.map((manager) => ({
        // unique value
        value: `${manager.id}_${manager.name}_${manager.email}`,
        id: manager.id,
        label: manager.name,
        type: ROUTING_PARAMS.MANAGER
      }));

      return [...state, ...options];
    },
    [actions.fetchCompanies.SUCCESS](state, { payload }) {
      const options = payload.map((company) => ({
        value: company.id,
        id: company.id,
        label: company.name,
        type: ROUTING_PARAMS.COMPANY
      }));

      return [...state, ...options];
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const radarSelected = handleActions(
  {
    [actions.selectRadarOption.TRIGGER](state, { payload }) {
      return payload;
    },
    //for init phase
    [actions.selectRadarOption.SUCCESS](state, { payload }) {
      return payload;
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
  selected: radarSelected,
  options: radarOptions
});

const managersData = handleActions(
  {
    [actions.fetchManagers.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const companiesData = handleActions(
  {
    [actions.fetchCompanies.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const companies = combineReducers({
  status: makeStatusWithResetReducer(actions.fetchCompanies, actions.clearAll.TRIGGER),
  data: companiesData
});

const managers = combineReducers({
  status: makeStatusWithResetReducer(actions.fetchManagers, actions.clearAll.TRIGGER),
  data: managersData
});

const status = makeStatusWithResetReducer(actions.fetchAll, actions.clearAll.TRIGGER);

const customerDashboard = combineReducers({
  status,
  radar,
  managers,
  companies
});

export default customerDashboard;
