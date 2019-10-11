import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './companyProfileActions';
import { makeStatusReducer } from '../../utils/reduxHelpers';

import { PROPS } from '../../pages/profile/overview/const';

const { emptyData } = PROPS;

const radarStatus = makeStatusReducer(actions.getRadarScores);

const radarData = handleActions(
  {
    [actions.getRadarScores.SUCCESS](state, { payload }) {
      return payload || emptyData;
    }
  },
  emptyData
);

const radar = combineReducers({
  status: radarStatus,
  data: radarData
});

const satisfiedClientsStatus = makeStatusReducer(actions.getSatisfiedClients);

const satisfiedClientsData = handleActions(
  {
    [actions.getSatisfiedClients.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const satisfaction = combineReducers({
  status: satisfiedClientsStatus,
  data: satisfiedClientsData
});

const companyProfile = combineReducers({
  radar,
  satisfaction
});

export default companyProfile;
