const getCriteriaStatus = (state) => state.opinionDetails.criteria.status;
const getCriteriaData = (state) => state.opinionDetails.criteria.data;

const selectedCriteria = (state) => state.opinionDetails.selectedCriteria;
const selectedSubject = (state) => state.opinionDetails.selectedSubject;
const selectedTopic = (state) => state.opinionDetails.selectedTopic;

const selectedProfile = (state) => state.opinionDetails.selectedProfile;

const getLineFilter = (state) => state.opinionDetails.chart.lineFilter;
const getDateOffset = (state) => state.opinionDetails.chart.dateOffset;

const getChartStatus = (state) => state.opinionDetails.chart.status;
const getChartData = (state) => state.opinionDetails.chart.data;
const getChartPagination = (state) => state.opinionDetails.chart.pagination;

const getTopicGradesStatus = (state) => state.opinionDetails.topicGrades.status;
const getTopicCtruScore = (state) => state.opinionDetails.topicGrades.ctruScore;
const getTopicGrades = (state) => state.opinionDetails.topicGrades.grades;

/* eslint-disable */
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
  selectedTopic,

  selectedProfile,

  getChartStatus,
  getChartData,
  getChartPagination,

  getLineFilter,
  getDateOffset,

  getTopicGradesStatus,
  getTopicCtruScore,
  getTopicGrades,

  comments: (state) => state.opinionDetails.comments,
  participation: (state) => state.opinionDetails.participation
};
