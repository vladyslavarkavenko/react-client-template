import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './opinionsActions';

const staff = handleActions(
  {
    [actions.fetchStaffStatistics.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const companies = handleActions(
  {
    [actions.fetchCompaniesStatistics.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const opinions = combineReducers({
  staff,
  companies
});

export default opinions;
