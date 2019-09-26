const getSubjectsData = (state) => state.shareOpinion.subjects.data;

const getSelectedTopics = (state) => state.shareOpinion.selectedTopics;
const getSelectedTopicsId = (state) => getSelectedTopics(state).map((topic) => topic.id);

const getExpiredOpinions = (state) => state.shareOpinion.expiredOpinions;
const getExpiredOpinionsBySubject = (state, subjectId) => getExpiredOpinions(state)[subjectId];

const getNewTopic = (state) => state.shareOpinion.newTopic;
const getNewTopicInput = (state) => getNewTopic(state).input;
const getNewTopicErrors = (state) => getNewTopic(state).errors;
const getNewTopicSelected = (state) => getNewTopic(state).selected;
const getNewTopicStatus = (state) => getNewTopic(state).status;
const getNewTopicHints = (state) => getNewTopic(state).hints;
const getNewTopicShowModal = (state) => getNewTopic(state).showModal;

const getUnratedTopic = (state) => getSelectedTopics(state).find((topic) => topic.isRated !== true);

export default {
  selectedTopics: getSelectedTopics,
  selectedTopicsId: getSelectedTopicsId,
  selectedProfile: (state) => state.shareOpinion.selectedProfile,
  expiredOpinions: getExpiredOpinions,
  expiredOpinionsById: getExpiredOpinionsBySubject,

  subjectsStatus: (state) => state.shareOpinion.subjects.status,
  subjectsData: getSubjectsData,

  newTopic: getNewTopic,
  newTopicInput: getNewTopicInput,
  newTopicErrors: getNewTopicErrors,
  newTopicSelected: getNewTopicSelected,
  newTopicStatus: getNewTopicStatus,
  newTopicShowModal: getNewTopicShowModal,
  newTopicHints: getNewTopicHints,

  nextUnratedTopic: getUnratedTopic
};
