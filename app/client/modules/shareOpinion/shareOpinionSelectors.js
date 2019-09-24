const getSelectedTopics = (state) => state.shareOpinion.selectedTopics;
const getSelectedTopicsId = (state) => getSelectedTopics(state).map((topic) => topic.id);

export default {
  selectedTopics: (state) => getSelectedTopics(state),
  selectedTopicsId: (state) => getSelectedTopicsId(state),
  selectedProfile: (state) => state.shareOpinion.selectedProfile,

  subjectsStatus: (state) => state.shareOpinion.subjects.status,
  subjectsData: (state) => state.shareOpinion.subjects.data
};
