import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { differenceInMonths } from 'date-fns';

import { RATE_PROFILE_TYPE } from '../../utils/constants';
import { makeStatusReducer, makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import * as actions from './shareOpinionActions';

const topicOpinions = handleActions(
  {
    [actions.fetchTopicOpinions.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.pushRateTopic.SUCCESS]() {
      return [];
    }
  },
  []
);

const selectedProfile = handleActions(
  {
    [actions.selectOpinionProfile.TRIGGER](state, { payload }) {
      const { type, data } = payload;

      const { id, avatar, customerId } = data;

      const title = type === RATE_PROFILE_TYPE.COMPANY ? data.name : data.firstName;

      return { type, id, avatar, title, customerId };
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

    [actions.pushNewTopic.SUCCESS](state, { payload }) {
      const newTopic = {
        name: payload.name,
        id: payload.id,
        dateLastOpinion: null,
        satisfaction: null,
        importance: null
      };

      return [newTopic, ...state];
    },
    [actions.pushRateTopic.SUCCESS](state, { payload }) {
      const cloned = [...state];

      const currentTopicIndex = cloned.findIndex((topic) => topic.id === payload.topic);

      cloned[currentTopicIndex] = {
        ...cloned[currentTopicIndex],
        satisfaction: payload.satisfaction,
        importance: payload.importance,
        dateLastOpinion: payload.dateLastOpinion,
        isRated: true
      };

      return cloned;
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

const newTopicStatus = makeStatusReducer(actions.pushNewTopic);

const newTopicInputInitial = {
  subject: '',
  topic: ''
};

const newTopicInput = handleActions(
  {
    [actions.saveNewTopicField.TRIGGER](state, { payload }) {
      return { ...state, [payload.type]: payload.value };
    },
    [actions.selectSubjectForNewTopic.TRIGGER](state, { payload }) {
      return { ...state, subject: payload.name };
    },
    [actions.pushNewTopic.FULFILL]() {
      return newTopicInputInitial;
    }
  },
  newTopicInputInitial
);

const newTopicHints = handleActions(
  {
    [actions.saveNewTopicField.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.saveNewTopicField.FULFILL]() {
      return [];
    },
    [actions.pushNewTopic.FULFILL]() {
      return [];
    }
  },
  []
);

const newTopicErrors = handleActions(
  {
    [actions.pushNewTopic.TRIGGER]() {
      return {};
    },
    [actions.pushNewTopic.FAILURE](state, { payload }) {
      if (payload) {
        return payload;
      }

      return state;
    },
    [actions.pushNewTopic.FULFILL]() {
      return {};
    }
  },
  {}
);

const newTopicSelectedSubject = handleActions(
  {
    [actions.selectSubjectForNewTopic.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.pushNewTopic.FULFILL]() {
      return null;
    }
  },
  null
);

const newTopicModal = handleActions(
  {
    [actions.pushNewTopic.TRIGGER]() {
      return true;
    },
    [actions.pushNewTopic.FULFILL]() {
      return false;
    }
  },
  false
);

const subjects = combineReducers({
  status: subjectsStatus,
  data: subjectsData
});

const newTopic = combineReducers({
  showModal: newTopicModal,
  status: newTopicStatus,
  selected: newTopicSelectedSubject,
  input: newTopicInput,
  errors: newTopicErrors,
  hints: newTopicHints
});

const shareOpinion = combineReducers({
  topicOpinions,
  selectedProfile,
  selectedTopics,
  expiredOpinions,
  subjects,
  newTopic
});

export default shareOpinion;
