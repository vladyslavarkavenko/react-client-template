import { handleActions } from 'redux-actions';

import { combineReducers } from 'redux';
import * as actions from './compareActions';

const data = handleActions(
  {
    [actions.fetchCompareData.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const topics = handleActions(
  {
    [actions.fetchTop5Topics.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const compare = combineReducers({
  data,
  topics
});

export default compare;
