import { handleActions } from 'redux-actions';

import * as actions from './compareActions';

const compare = handleActions(
  {
    [actions.fetchCompareData.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

export default compare;
