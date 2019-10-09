import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './managerProfileActions';
import { makeStatusReducer } from '../../utils/reduxHelpers';
import { createRadarInitial } from '../helpers/radarHelpers';

const initialRadarData = createRadarInitial();

const radarStatus = makeStatusReducer(actions.fetchRadarScores);

const radarData = handleActions(
  {
    [actions.fetchRadarScores.SUCCESS](state, { payload }) {
      return payload || initialRadarData;
    }
  },
  initialRadarData
);

const radar = combineReducers({
  status: radarStatus,
  data: radarData
});

const satisfiedClientsStatus = makeStatusReducer(actions.fetchSatisfiedClients);

const satisfiedClientsData = handleActions(
  {
    [actions.fetchSatisfiedClients.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const satisfaction = combineReducers({
  status: satisfiedClientsStatus,
  data: satisfiedClientsData
});

const managerProfile = combineReducers({
  radar,
  satisfaction
});

export default managerProfile;
