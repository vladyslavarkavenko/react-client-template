import { handleActions } from 'redux-actions';

import * as actions from './dashboardActions';

const dashboard = handleActions(
  {
    [actions.fetchActiveStaff.SUCCESS](state, { payload }) {
      console.log('payload', payload);
      return { staff: payload };
    }
  },
  { staff: null }
);

export default dashboard;
