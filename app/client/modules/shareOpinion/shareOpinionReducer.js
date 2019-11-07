import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { RATE_PROFILE_TYPE } from '../../utils/constants';
import { makeStatusReducer, makeStatusWithResetReducer } from '../../utils/reduxHelpers';
import * as actions from './shareOpinionActions';
import getOnlyActual from './helpers/getOnlyActual';

const topicOpinions = handleActions(
  {
    [actions.fetchTopicOpinions.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.fetchTopicOpinions.FAILURE]() {
      return [];
    },
    [actions.saveTopicRate.SUCCESS]() {
      return [];
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return [];
    },
    [actions.selectOpinionProfile.TRIGGER]() {
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

      const title =
        type === RATE_PROFILE_TYPE.COMPANY ? data.name : `${data.firstName} ${data.lastName}`;

      return { type, id, avatar, title, customerId };
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return null;
    }
  },
  null
);

const selectedTopics = handleActions(
  {
    [actions.selectOpinionTopic.TRIGGER](state, { payload }) {
      // payload is topic_model or array of topic_model
      if (Array.isArray(payload)) {
        return payload;
      }

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
        importance: null,
        _isCreated: true
      };

      return [newTopic, ...state];
    },
    [actions.saveTopicRate.SUCCESS](state, { payload }) {
      const cloned = [...state];

      const currentTopicIndex = cloned.findIndex((topic) => topic.id === payload.id);

      cloned[currentTopicIndex] = {
        ...payload,
        isRated: true
      };

      return cloned;
    },
    [actions.selectTopicReview.TRIGGER](state, { payload }) {
      const cloned = [...state];

      const currentTopicIndex = cloned.findIndex((topic) => topic.id === payload);

      cloned[currentTopicIndex] = {
        ...cloned[currentTopicIndex],
        isChecked: !cloned[currentTopicIndex].isChecked
      };

      return cloned;
    },
    [actions.saveTopicField.TRIGGER](state, { payload }) {
      const cloned = [...state];

      const currentTopicIndex = cloned.findIndex((topic) => topic.id === payload.id);

      cloned[currentTopicIndex] = {
        ...cloned[currentTopicIndex],
        comment: payload.value
      };

      return cloned;
    },
    [actions.selectOpinionExpired.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return [];
    },
    [actions.selectOpinionProfile.TRIGGER]() {
      return [];
    }
  },
  []
);

const actualSubjects = handleActions(
  {
    [actions.fetchOpinionSubjects.SUCCESS](state, { payload }) {
      return getOnlyActual(payload);
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return [];
    },
    [actions.selectOpinionProfile.TRIGGER]() {
      return [];
    }
  },
  []
);

// const expiredOpinions = handleActions(
//   {
//     [actions.fetchOpinionSubjects.SUCCESS](state, { payload }) {
//       return getOnlyExpired(payload);
//     },
//     [actions.pushTopicsRate.SUCCESS]() {
//       return {};
//     },
//     [actions.selectOpinionProfile.TRIGGER]() {
//       return {};
//     }
//   },
//   {}
// );

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
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return [];
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
    [actions.pushTopicsRate.SUCCESS]() {
      return newTopicInputInitial;
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
    },
    [actions.pushTopicsRate.SUCCESS]() {
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
    },
    [actions.pushTopicsRate.SUCCESS]() {
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
    },
    [actions.pushTopicsRate.SUCCESS]() {
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
    [actions.pushNewTopic.SUCCESS]() {
      return false;
    },
    [actions.pushNewTopic.FULFILL]() {
      return false;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return false;
    }
  },
  false
);

const withComments = handleActions(
  {
    [actions.selectReviewRecommend.SUCCESS]() {
      return true;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return false;
    }
  },
  false
);

const isRecommended = handleActions(
  {
    [actions.selectReviewRecommend.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.calcAverageRate.TRIGGER](state, { payload }) {
      if (payload < 6) {
        return 3; // not recommend
      }

      if (payload >= 6 && payload < 8) {
        return 2; // not sure
      }

      return 1; // will recommend
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return 1;
    }
  },
  1
);

const whoCanSee = handleActions(
  {
    [actions.selectWhoCanSee.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return 3;
    }
  },
  3
);

const isExpectingAction = handleActions(
  {
    [actions.selectExpectAction.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return false;
    }
  },
  false
);

const sharedComment = handleActions(
  {
    [actions.setSharedComment.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return '';
    }
  },
  ''
);

const isSharedComment = handleActions(
  {
    [actions.setSharedComment.TRIGGER](state) {
      return !state;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return false;
    }
  },
  false
);

const finishStatus = makeStatusReducer(actions.pushTopicsRate);
const saveTopicStatus = makeStatusReducer(actions.saveTopicRate);

const averageRate = handleActions(
  {
    [actions.calcAverageRate.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.pushTopicsRate.SUCCESS]() {
      return 0;
    }
  },
  0
);

const globalExpiredInitial = {
  [RATE_PROFILE_TYPE.MANAGER]: {},
  [RATE_PROFILE_TYPE.COMPANY]: {}
};

const globalExpired = handleActions(
  {
    [actions.fetchExpiredGlobal.TRIGGER]() {
      return globalExpiredInitial;
    },
    [actions.fetchExpiredGlobal.FAILURE]() {
      return globalExpiredInitial;
    },
    [actions.fetchExpiredGlobal.SUCCESS](state, { payload }) {
      return payload.globalExpired;
    }
  },
  globalExpiredInitial
);

const globalOpinions = handleActions(
  {
    [actions.fetchExpiredGlobal.TRIGGER]() {
      return globalExpiredInitial;
    },
    [actions.fetchExpiredGlobal.FAILURE]() {
      return globalExpiredInitial;
    },
    [actions.fetchExpiredGlobal.SUCCESS](state, { payload }) {
      return payload.globalOpinions;
    }
  },
  globalExpiredInitial
);

const subjects = combineReducers({
  status: subjectsStatus,
  data: subjectsData
});

const selectedOptions = combineReducers({
  sharedComment,
  isSharedComment,
  isExpectingAction,
  isRecommended,
  whoCanSee,
  withComments,
  status: finishStatus
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
  globalExpired,
  globalOpinions,

  saveTopicStatus,
  topicOpinions,
  averageRate,
  selectedProfile,
  selectedTopics,
  selectedOptions,
  // expiredOpinions,
  actualSubjects,
  subjects,
  newTopic
});

export default shareOpinion;
