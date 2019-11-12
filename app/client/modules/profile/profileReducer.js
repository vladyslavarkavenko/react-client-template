import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './profileActions';
import { PROPS } from '../../components/widgets/radar/const';
import { makeStatusReducer } from '../../utils/reduxHelpers';

const { emptyData } = PROPS;

const initialData = { isInitial: true, avgSatisfaction: undefined, ...emptyData };
const profile = handleActions(
  {
    [actions.getRadarScores.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  initialData
);

const profileStatus = makeStatusReducer(actions.getRadarScores);

const profileReducer = combineReducers({
  status: profileStatus,
  data: profile
});

export default profileReducer;
