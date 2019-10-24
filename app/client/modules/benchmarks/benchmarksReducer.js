import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './benchmarksActions';

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
  isOpen: filtersIsOpen
});

const benchmarks = combineReducers({
  filters
});

export default benchmarks;
