import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './dashboardActions';
import { makeStatusReducer } from '../../utils/reduxHelpers';

const feedback = handleActions(
  {
    [actions.fetchFeedback.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);
const feedbackStatus = makeStatusReducer(actions.fetchFeedback);

const staff = handleActions(
  {
    [actions.fetchActiveStaff.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);
const staffStatus = makeStatusReducer(actions.fetchActiveStaff);

const companyData = handleActions(
  {
    [actions.fetchStatistics.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);
const companyDataStatus = makeStatusReducer(actions.fetchStatistics);

const top = handleActions(
  {
    [actions.fetchTop.SUCCESS](state, { payload }) {
      return { ...state, ...payload.data };
    }
  },
  { 1: null, 2: null, 3: null }
);
const topStatus = handleActions(
  {
    [actions.fetchTop.REQUEST](state, { payload }) {
      return { ...state, [payload.key]: 'request' };
    },
    [actions.fetchTop.FAILURE](state, { payload }) {
      return { ...state, [payload.key]: 'failure' };
    },
    [actions.fetchTop.SUCCESS](state, { payload }) {
      return { ...state, [payload.key]: 'success' };
    }
  },
  { 1: 'none', 2: 'none', 3: 'none' }
);

const companyDataReducer = combineReducers({ data: companyData, status: companyDataStatus });
const staffReducer = combineReducers({ data: staff, status: staffStatus });
const feedbackReducer = combineReducers({ data: feedback, status: feedbackStatus });
const topReducer = combineReducers({ data: top, status: topStatus });

const dashboard = combineReducers({
  companyData: companyDataReducer,
  staff: staffReducer,
  feedback: feedbackReducer,
  top: topReducer
});

export default dashboard;
