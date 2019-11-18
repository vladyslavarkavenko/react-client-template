import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './kpiSettingsActions';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import normalizeSettings from './helpers/normalizeSettings';

const settingsInitial = normalizeSettings();

const settings = combineReducers({
  status: makeStatusWithResetReducer(actions.fetchStatistics, actions.clearAll.TRIGGER),
  target: handleActions(
    {
      [actions.fetchStatistics.SUCCESS](state, { payload }) {
        return payload.kpi;
      },
      [actions.pushSaveChanges.SUCCESS](state, { payload }) {
        return payload;
      },
      [actions.clearAll.TRIGGER]() {
        return settingsInitial;
      }
    },
    settingsInitial
  ),
  actual: handleActions(
    {
      [actions.fetchStatistics.SUCCESS](state, { payload }) {
        return payload.statistics;
      },
      [actions.clearAll.TRIGGER]() {
        return {};
      }
    },
    {}
  )
});

const ctru = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload.kpi.ctru;
    },
    [actions.setCtruValue.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.setCtruValue.FULFILL](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return 5;
    }
  },
  5
);

const satisfaction = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload.kpi.satisfaction;
    },
    [actions.setSatisfactionValue.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.setSatisfactionValue.FULFILL](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return 50;
    }
  },
  50
);

const participation = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload.kpi.participation;
    },
    [actions.setParticipationValue.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.setParticipationValue.FULFILL](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return 50;
    }
  },
  50
);

const nps = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload.kpi.nps;
    },
    [actions.setNPSValue.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.setNPSValue.FULFILL](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return 0;
    }
  },
  0
);

const input = combineReducers({
  ctru,
  satisfaction,
  participation,
  nps
});

const kpiSettings = combineReducers({
  settings,
  input
});

export default kpiSettings;
