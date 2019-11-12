import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './opinionDetailsActions';
import { LINE_TYPES, DATE_OFFSET } from './helpers/constants';
import { DATE_GRANULARITY } from '../../utils/constants';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import { minMaxRandom } from '../../utils/helpers';
import calcYearOffset from './helpers/calcYearOffset';
import trimDate from './helpers/trimDate';

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

const selectedProfile = handleActions(
  {
    [actions.fetchOpinionDetails.SUCCESS](state, { payload }) {
      return payload.profile;
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

const participation = combineReducers({
  status: makeStatusWithResetReducer(actions.fetchOpinionParticipation, actions.clearAll.TRIGGER),
  data: handleActions(
    {
      [actions.fetchOpinionParticipation.SUCCESS](state, { payload }) {
        return payload;
      },
      [actions.clearAll.TRIGGER]() {
        return {};
      }
    },
    {}
  )
});

/* eslint-disable */
const chartDataGenerator = () => {
  // const t0 = window.performance.now();
  const data = [];

  const months = 0;

  for (let i = 1; i <= months; i++) {
    const date = new Date(2019, i - 1, 1);
    data.push({ date, importance: minMaxRandom(7, 9), satisfaction: minMaxRandom(3, 5) });
  }

  // const days = 365 * 2;
  //
  // for (let i = 1; i <= days; i++) {
  //   const date = new Date(2018, 0, i);
  //   data.push({ date, importance: minMaxRandom(6, 9), satisfaction: minMaxRandom(4, 5) });
  // }

  // console.log(data, window.performance.now() - t0);

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
    [actions.setProfile.SUCCESS]() {
      return DATE_OFFSET.YEAR;
    },
    [actions.setDateOffset.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return DATE_OFFSET.YEAR;
    }
  },
  DATE_OFFSET.YEAR
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
    [actions.setProfile.SUCCESS]() {
      return paginationInitial;
    },
    [actions.calcChartOffset.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  paginationInitial
);

const chart = combineReducers({
  data: chartData,
  pagination: chartPagination,
  lineFilter,
  dateOffset
});

const opinionDetails = combineReducers({
  criteria,
  chart,
  comments,
  participation,
  selectedCriteria,
  selectedSubject,
  selectedTopic,

  selectedProfile
});

export default opinionDetails;
