import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './profileActions';
import { PROPS } from '../../pages/profile/overview/const';

const { emptyData } = PROPS;

const satisfiedClients = handleActions(
  {
    [actions.getSatisfiedClients.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const grades = handleActions(
  {
    [actions.getRadarScores.SUCCESS](state, { payload }) {
      return payload || emptyData;
    }
  },
  emptyData
);

const profileReducer = combineReducers({
  grades,
  satisfiedClients
});

export default profileReducer;
