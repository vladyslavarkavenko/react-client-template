const getCriteriaStatus = (state) => state.opinionDetails.criteria.status;
const getCriteriaData = (state) => state.opinionDetails.criteria.data;

const selectedCriteria = (state) => state.opinionDetails.selectedCriteria;
const selectedSubject = (state) => state.opinionDetails.selectedSubject;
const selectedTopic = (state) => state.opinionDetails.selectedTopic;

const getCriteriaList = (state) => {
  const criteria = Object.values(getCriteriaData(state));
  const normalizedCriteria = criteria.map(({ subjects, ...criteriaProps }) => criteriaProps);

  return normalizedCriteria;
};

const getSubjectList = (state) => {
  try {
    const criteriaId = selectedCriteria(state);
    const data = getCriteriaData(state);

    if (!Object.keys(data).length || !criteriaId) {
      return [];
    }

    const subjects = Object.values(data[criteriaId].subjects);
    const normalizedSubjects = subjects.map(({ topics, ...subjectsProps }) => subjectsProps);

    return normalizedSubjects;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getTopicList = (state) => {
  try {
    const criteriaId = selectedCriteria(state);
    const subjectId = selectedSubject(state);
    const data = getCriteriaData(state);

    if (!Object.keys(data).length || !criteriaId || !subjectId) {
      return [];
    }

    const topics = Object.values(data[criteriaId].subjects[subjectId].topics);

    return topics;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default {
  getCriteriaStatus,
  getCriteriaData,

  getCriteriaList,
  getSubjectList,
  getTopicList,

  selectedCriteria,
  selectedSubject,
  selectedTopic
};
