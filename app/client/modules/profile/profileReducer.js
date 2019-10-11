import { handleActions } from 'redux-actions';

import * as actions from './profileActions';
import { PROPS } from '../../pages/profile/overview/const';

const { emptyData } = PROPS;

const initialData = { grades: emptyData, avgSatisfaction: undefined };
const profileReducer = handleActions(
  {
    [actions.getRadarScores.SUCCESS](state, { payload }) {
      console.log('payload', payload);
      return payload;
    }
  },
  initialData
);

export default profileReducer;
