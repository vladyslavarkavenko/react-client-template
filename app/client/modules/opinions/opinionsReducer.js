import { handleActions } from 'redux-actions';

import * as actions from './opinionsActions';

const opinions = handleActions(
  {
    [actions.fetchStaffStatistics.SUCCESS](state, { payload }) {
      console.log('payload', payload);
      return payload;
    }
  },
  null
);

export default opinions;
