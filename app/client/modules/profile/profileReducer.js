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

const mainAspects = handleActions(
  {
    [actions.getImportanceAspects.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const mainCriteria = handleActions(
  {
    [actions.getImportanceCriteria.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const mainSubjects = handleActions(
  {
    [actions.getOpinionSubjects.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const mainOpinions = handleActions(
  {
    [actions.getSatisfactionSubjects.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  null
);

const profileStatus = makeStatusReducer(actions.getRadarScores);

const profileReducer = combineReducers({
  status: profileStatus,
  data: profile,
  mainAspects,
  mainCriteria,
  mainSubjects,
  mainOpinions
});

export default profileReducer;
