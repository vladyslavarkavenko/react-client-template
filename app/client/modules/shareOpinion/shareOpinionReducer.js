import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { differenceInMonths } from 'date-fns';
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
    [actions.selectOpinionExpired.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.selectOpinionProfile.TRIGGER]() {
      return [];
    }
  },
  []
);

const expiredOpinions = handleActions(
  {
    [actions.fetchOpinionSubjects.SUCCESS](state, { payload }) {
      const expired = {};
      const now = new Date();

      payload.forEach((subject) => {
        // for every topic
        subject.topics.forEach((topic) => {
          // check time
          if (!topic.dateLastOpinion) {
            return;
          }

          const isExpired =
            differenceInMonths(now, new Date(topic.dateLastOpinion.split('-'))) >= 6;
          // push if expired
          if (isExpired) {
            expired[subject.id]
              ? expired[subject.id].push(topic.id)
              : (expired[subject.id] = [topic.id]);
          }
        });
      });

      return expired;
    },
    [actions.selectOpinionProfile.TRIGGER]() {
      return {};
    }
  },
  {}
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
  expiredOpinions,
  subjects
});

// reducerRegistry.register(actions.prefix, companiesReducer);
export default shareOpinion;
