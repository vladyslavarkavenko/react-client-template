import { DATE_OFFSET } from './helpers/constants';

const getCriteriaStatus = (state) => state.opinionDetails.criteria.status;
const getCriteriaData = (state) => state.opinionDetails.criteria.data;

const selectedCriteria = (state) => state.opinionDetails.selectedCriteria;
const selectedSubject = (state) => state.opinionDetails.selectedSubject;
const selectedTopic = (state) => state.opinionDetails.selectedTopic;

const getLineFilter = (state) => state.opinionDetails.chart.lineFilter;
const getDateOffset = (state) => state.opinionDetails.chart.dateOffset;

const getChartRawData = (state) => state.opinionDetails.chart.data;
const getChartPagination = (state) => state.opinionDetails.chart.pagination;

/* eslint-disable */

const groupByMonths = (dates) => {};

const getChartSliceData = (state) => {
  const rawData = getChartRawData(state);
  const dateOffset = getDateOffset(state);
  const { step, maxStep, minStep, minDate, maxDate } = getChartPagination(state);

  let filterFunc;

  switch (dateOffset) {
    case DATE_OFFSET.YEAR:
      const minYear = new Date(minDate).getFullYear();
      const maxYear = new Date(maxDate).getFullYear();

      const rightLimit = new Date(maxYear - (maxStep - step) + 1, 0, 1);
      const leftLimit = new Date(rightLimit.getFullYear() - 1, 0, 1);

      console.log(leftLimit.getFullYear(), rightLimit.getFullYear());
      filterFunc = (item) => {
        const itemDate = new Date(item.date);

        return itemDate >= leftLimit && itemDate <= rightLimit;
      };
      break;
  }

  const slice = rawData.filter(filterFunc);

  return slice;
};

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

  getChartRawData,
  getChartPagination,
  getChartSliceData,

  getLineFilter,
  getDateOffset,
  comments: (state) => state.opinionDetails.comments
};
