import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './opinionDetailsActions';
import { LINE_TYPES, DATE_OFFSET } from './helpers/constants';
import { DATE_GRANULARITY } from '../../utils/constants';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import { paginationInitial as commentPaginationInitial } from '../helpers/paginate';
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

const commentsStatus = makeStatusWithResetReducer(
  actions.fetchOpinionComments,
  actions.clearAll.TRIGGER
);

const commentsData = handleActions(
  {
    [actions.fetchOpinionComments.SUCCESS](state, { payload }) {
      return payload.results;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const commentsPagination = handleActions(
  {
    [actions.fetchOpinionComments.SUCCESS](state, { payload }) {
      return payload.pagination;
    },
    [actions.clearAll.TRIGGER]() {
      return commentPaginationInitial();
    }
  },
  commentPaginationInitial()
);

const comments = combineReducers({
  status: commentsStatus,
  data: commentsData,

  pagination: commentsPagination
});

const topicGrades = combineReducers({
  status: makeStatusWithResetReducer(actions.fetchOpinionGrades, actions.clearAll.TRIGGER),
  ctruScore: handleActions(
    {
      [actions.fetchOpinionGrades.SUCCESS](state, { payload }) {
        return payload.ctruScore;
      },
      [actions.clearAll.TRIGGER]() {
        return 0;
      }
    },
    0
  ),
  grades: handleActions(
    {
      [actions.fetchOpinionGrades.SUCCESS](state, { payload }) {
        return payload.grades;
      },
      [actions.clearAll.TRIGGER]() {
        return [];
      }
    },
    []
  )
});

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
  status: chartStatus,
  data: chartData,
  pagination: chartPagination,
  lineFilter,
  dateOffset
});

const opinionDetails = combineReducers({
  criteria,
  chart,
  comments,
  topicGrades,
  participation,
  selectedCriteria,
  selectedSubject,
  selectedTopic,

  selectedProfile
});

export default opinionDetails;
