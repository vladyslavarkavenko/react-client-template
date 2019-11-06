import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './dashboardActions';

const feedback = handleActions(
  {
    [actions.fetchFeedback.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const staff = handleActions(
  {
    [actions.fetchActiveStaff.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const companyData = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const top = handleActions(
  {
    [actions.fetchTop.SUCCESS](state, { payload }) {
      console.log('payload', payload);
      return { ...state, ...payload };
    }
  },
  { 1: null, 2: null, 3: null }
);

const dashboard = combineReducers({ companyData, staff, feedback, top });

export default dashboard;
