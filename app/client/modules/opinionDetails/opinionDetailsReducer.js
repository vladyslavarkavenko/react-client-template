import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './opinionDetailsActions';
import { LINE_TYPES, DATE_OFFSET } from './helpers/constants';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import { minMaxRandom } from '../../utils/helpers';

const criteriaStatus = makeStatusWithResetReducer(
  actions.fetchOpinionDetails,
  actions.clearAll.TRIGGER
);

const criteriaData = handleActions(
  {
    [actions.fetchOpinionDetails.SUCCESS](state, { payload }) {
      return payload.data;
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    }
  },
  {}
);

const criteria = combineReducers({
  status: criteriaStatus,
  data: criteriaData
});

const selectedCriteria = handleActions(
  {
    [actions.setProfile.SUCCESS](state, { payload }) {
      return payload.criteria;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    }
  },
  null
);

const selectedSubject = handleActions(
  {
    [actions.setProfile.SUCCESS](state, { payload }) {
      return payload.subject;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    }
  },
  null
);

const selectedTopic = handleActions(
  {
    [actions.setProfile.SUCCESS](state, { payload }) {
      return payload.topic;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    }
  },
  null
);

const comments = handleActions(
  {
    [actions.fetchOpinionDetails.SUCCESS](state, { payload }) {
      return payload.comments;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

/* eslint-disable */
const chartDataGenerator = () => {
  const t0 = window.performance.now();
  const data = [];

  const days = 365 * 2;

  for (let i = 1; i <= days; i++) {
    const date = new Date(2018, 0, i);
    data.push({ date, importance: minMaxRandom(6, 9), satisfaction: minMaxRandom(4, 5) });
  }

  console.log(data, window.performance.now() - t0);

  return data;
};

const chartData = handleActions({}, chartDataGenerator());

const lineFilterInitial = [LINE_TYPES.IMPORTANCE, LINE_TYPES.SATISFACTION];

const lineFilter = handleActions(
  {
    [actions.setLineFilter.TRIGGER](state, { payload }) {
      if (payload === LINE_TYPES.BOTH) {
        return lineFilterInitial;
      }

      return [payload];
    },
    [actions.clearAll.TRIGGER]() {
      return lineFilterInitial;
    }
  },
  lineFilterInitial
);

const dateOffset = handleActions(
  {
    [actions.setDateOffset.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return DATE_OFFSET.YEAR;
    }
  },
  DATE_OFFSET.YEAR
);

const paginationInitial = {
  step: null,
  maxStep: 5,
  minStep: 1,

  maxDate: null,
  minDate: null
};

const chartPagination = handleActions(
  {
    [actions.calcChartOffset.REQUEST](state) {
      return {
        ...state,
        step: null
      };
    },
    [actions.calcChartOffset.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.handleNextOffset.TRIGGER](state) {
      const cloned = { ...state };

      if (!cloned.step || cloned.step === cloned.maxStep) {
        return state;
      }

      cloned.step = cloned.step + 1;
      return cloned;
    },
    [actions.handlePrevOffset.TRIGGER](state) {
      const cloned = { ...state };

      if (!cloned.step || cloned.step === cloned.minStep) {
        return state;
      }

      cloned.step = cloned.step - 1;
      return cloned;
    }
  },
  paginationInitial
);

const chart = combineReducers({
  data: chartData,
  lineFilter,
  dateOffset,
  pagination: chartPagination
  // pagination: {
  //
  // },
  // status: null
});

const opinionDetails = combineReducers({
  criteria,
  chart,
  comments,
  selectedCriteria,
  selectedSubject,
  selectedTopic
});

export default opinionDetails;
