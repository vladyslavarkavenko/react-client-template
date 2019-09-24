import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { RATE_PROFILE_TYPE } from '../../utils/constants';

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

const selectedTopics = handleActions(
  {
    [actions.selectOpinionTopic.TRIGGER](state, { payload }) {
      // payload is topic_model
      const idList = state.map((topic) => topic.id);

      if (idList.includes(payload.id)) {
        return state.filter((topic) => topic.id !== payload.id);
      }

      return [...state, payload];
    },
    [actions.selectOpinionProfile.TRIGGER]() {
      return [];
    }
  },
  []
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
  selectedTopics,
  subjects
});

// reducerRegistry.register(actions.prefix, companiesReducer);
export default shareOpinion;
