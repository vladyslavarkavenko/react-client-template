import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { RATE_PROFILE_TYPE } from '../../utils/constants';
// import reducerRegistry from '../../utils/reducerRegistry';

import * as actions from './shareOpinionActions';
import { makeStatusWithResetReducer } from '../../utils/reduxHelpers';

const selectedProfile = handleActions(
  {
    [actions.selectOpinionProfile.TRIGGER](state, { payload }) {
      const { type, data } = payload;

      const { id, avatar } = data;

      const title = type === RATE_PROFILE_TYPE.COMPANY ? data.name : data.firstName;

      return { type, id, avatar, title };
    }
  },
  null
);

const subjectsStatus = makeStatusWithResetReducer(
  actions.fetchOpinionSubjects,
  actions.selectOpinionProfile.TRIGGER
);

const subjectsData = handleActions(
  {
    [actions.selectOpinionProfile.TRIGGER]() {
      return [];
    },
    [actions.fetchOpinionSubjects.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  []
);

const subjects = combineReducers({
  status: subjectsStatus,
  data: subjectsData
});

// const selectedTopics = handleActions()

const shareOpinion = combineReducers({
  selectedProfile,
  subjects
});

// reducerRegistry.register(actions.prefix, companiesReducer);
export default shareOpinion;
