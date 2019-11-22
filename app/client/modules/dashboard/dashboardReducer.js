import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './dashboardActions';
import { makeStatusReducer, makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import { LINE_TYPES } from './helpers/constants';
import calcYearOffset from '../opinionDetails/helpers/calcYearOffset';
import { DATE_GRANULARITY } from '../../utils/constants';
import trimDate from '../opinionDetails/helpers/trimDate';

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

const chartStatus = makeStatusWithResetReducer(actions.fetchHistory, actions.clearAll.TRIGGER);

const chartData = handleActions(
  {
    [actions.fetchHistory.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const makeLineFilterInitial = (list) => {
  const lines = {};

  Object.keys(list).forEach((line) => {
    lines[line] = true;
  });

  console.log(list, lines);

  return lines;
};

const lineFilterInitial = makeLineFilterInitial(LINE_TYPES);

const lineFilter = handleActions(
  {
    [actions.setLineFilter.TRIGGER](state, { payload }) {
      return {
        ...state,
        [payload]: !state[payload]
      };
    },
    [actions.clearAll.TRIGGER]() {
      return lineFilterInitial;
    }
  },
  lineFilterInitial
);

const now = new Date();

const initialYear = calcYearOffset(now);
const yearDiff = now.getFullYear() - 2014;
const initialMaxStep = yearDiff <= 1 ? 1 : yearDiff; //if local time is corrupted
const minYearDate = new Date(`${now.getFullYear() - initialMaxStep}-01-01`);

const paginationInitial = {
  granularity: DATE_GRANULARITY.MONTH,
  step: 1,
  maxStep: initialMaxStep,

  maxDate: initialYear.maxDate,
  minDate: initialYear.minDate,

  maxYearDiff: yearDiff,
  minYearDate: trimDate(minYearDate)
};

const chartPagination = handleActions(
  {
    [actions.calcChartOffset.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return paginationInitial;
    }
  },
  paginationInitial
);

const chart = combineReducers({
  status: chartStatus,
  data: chartData,
  pagination: chartPagination,
  lineFilter
});

const companyDataReducer = combineReducers({ data: companyData, status: companyDataStatus });
const staffReducer = combineReducers({ data: staff, status: staffStatus });
const feedbackReducer = combineReducers({ data: feedback, status: feedbackStatus });
const topReducer = combineReducers({ data: top, status: topStatus });

const dashboard = combineReducers({
  companyData: companyDataReducer,
  staff: staffReducer,
  feedback: feedbackReducer,
  top: topReducer,

  chart
});

export default dashboard;
