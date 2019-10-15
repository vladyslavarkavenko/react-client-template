import { handleActions } from 'redux-actions';

import * as actions from './profileActions';
import { PROPS } from '../../components/widgets/radar/const';

const { emptyData } = PROPS;

const initialData = { isInitial: true, avgSatisfaction: undefined, ...emptyData };
const profileReducer = handleActions(
  {
    [actions.getRadarScores.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  initialData
);

export default profileReducer;
