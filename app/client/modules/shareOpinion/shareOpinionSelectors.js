const getSubjectsData = (state) => state.shareOpinion.subjects.data;

const getSelectedTopics = (state) => state.shareOpinion.selectedTopics;
const getSelectedTopicsId = (state) => getSelectedTopics(state).map((topic) => topic.id);

const getExpiredOpinions = (state) => state.shareOpinion.expiredOpinions;
const getExpiredOpinionsBySubject = (state, subjectId) => getExpiredOpinions(state)[subjectId];
// const

export default {
  selectedTopics: getSelectedTopics,
  selectedTopicsId: getSelectedTopicsId,
  selectedProfile: (state) => state.shareOpinion.selectedProfile,
  expiredOpinions: getExpiredOpinions,
  expiredOpinionsById: getExpiredOpinionsBySubject,

  subjectsStatus: (state) => state.shareOpinion.subjects.status,
  subjectsData: getSubjectsData
};
