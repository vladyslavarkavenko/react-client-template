import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './benchmarksActions';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';

const filterStatus = makeStatusWithResetReducer(actions.fetchFilters, actions.clearAll.TRIGGER);

const filterData = handleActions(
  {
    [actions.fetchFilters.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const filterSelected = handleActions(
  {
    [actions.selectFilter.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.selectFilter.FULFILL]() {
      return [];
    }
  },
  []
);

const filtersIsOpen = handleActions(
  {
    [actions.toggleFilterSidebar.TRIGGER](state, { payload }) {
      if (payload) {
        return payload;
      }

      return !state;
    }
  },
  false
);

const filters = combineReducers({
  isOpen: filtersIsOpen,
  status: filterStatus,
  data: filterData,
  selected: filterSelected
});

const staffStatus = makeStatusWithResetReducer(actions.fetchBenchmarks, actions.clearAll.TRIGGER);

const staffData = handleActions(
  {
    [actions.fetchBenchmarks.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const fullStaffData = handleActions(
  {
    [actions.fetchAllStaff.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return [];
    }
  },
  []
);

const staff = combineReducers({
  status: staffStatus,
  data: combineReducers({
    filtered: staffData,
    full: fullStaffData
  })
});

const benchmarks = combineReducers({
  filters,
  staff
});

export default benchmarks;
