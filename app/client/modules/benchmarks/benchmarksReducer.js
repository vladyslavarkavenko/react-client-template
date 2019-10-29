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
      const idList = state.map((topic) => topic.id);

      if (idList.includes(payload.id)) {
        return state.filter((topic) => topic.id !== payload.id);
      }

      if (idList.length >= 5) {
        return state;
      }

      return [...state, payload];
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

const benchmarks = combineReducers({
  filters
});

export default benchmarks;
