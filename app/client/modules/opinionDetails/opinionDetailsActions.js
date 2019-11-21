/* eslint-disable */
import { put, takeLatest, all, call, select, fork } from 'redux-saga/effects';
import { addYears, addMonths, addWeeks } from 'date-fns';

import { DATE_OFFSET } from './helpers/constants';
import { ROUTING_PARAMS, DATE_GRANULARITY } from '../../utils/constants';
import Notification from '../../utils/notifications';
import ManagerService from '../../services/manager';
import ShareOpinionService from '../../services/shareOpinion';
import CompaniesService from '../../services/companies';
import opinionDetailsSelectors from './opinionDetailsSelectors';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

import normalizeCriteria from './helpers/normalizeCriteria';
import recursiveSelect from './helpers/recursiveSelect';
import calcYearOffset from './helpers/calcYearOffset';
import calcMonthOffset from './helpers/calcMonthOffset';
import calcMonthMaxStep from './helpers/calcMonthMaxStep';
import calcWeekMaxStep from './helpers/calcWeekMaxStep';
import calcWeekOffset from './helpers/calcWeekOffset';
import paginate from '../helpers/paginate';

export const prefix = 'opinionDetails';

const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchOpinionDetails = createRequestBound('OPINION_DETAILS_FETCH');
export const fetchOpinionComments = createRequestBound('OPINION_COMMENTS_FETCH');
export const fetchHistory = createRequestBound('OPINION_HISTORY_FETCH');

export const fetchOpinionParticipation = createRequestBound('OPINION_PARTICIPATION_FETCH');
export const fetchOpinionGrades = createRequestBound('OPINION_GRADES_FETCH');

export const setProfile = createRequestBound('PROFILE_SET');

export const selectOption = createRequestBound('OPTION_SELECT');

export const setLineFilter = createOnlyTriggerBound('C_LINE_FILTER_SET');
export const setDateOffset = createOnlyTriggerBound('C_DATE_OFFSET_SET');

export const calcChartOffset = createRequestBound('C_PAGINATION_CALC');

export const handleNextOffset = createOnlyTriggerBound('C_OFFSET_NEXT');
export const handlePrevOffset = createOnlyTriggerBound('C_OFFSET_PREV');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getHistoryWorker() {
  yield put(fetchHistory.request());
  try {
    const profile = yield select(opinionDetailsSelectors.selectedProfile);
    const topic = yield select(opinionDetailsSelectors.selectedTopic);

    const { minDate, maxDate, granularity } = yield select(
      opinionDetailsSelectors.getChartPagination
    );

    if (!topic.id) {
      throw new Error('Topic not selected');
    }

    const historyOptions = {
      start: minDate,
      end: maxDate,
      topic: topic.id,
      granularity: granularity,
      manager: profile.type === ROUTING_PARAMS.MANAGER ? profile.id : undefined,
      company: profile.type === ROUTING_PARAMS.COMPANY ? profile.id : undefined
    };

    const history = yield call(ShareOpinionService.getOpinionHistory, historyOptions);

    yield put(fetchHistory.success(history));
  } catch (err) {
    console.error(err);
    yield put(fetchHistory.failure());
  }
}

function* prevOffsetWorker() {
  const offset = yield select(opinionDetailsSelectors.getDateOffset);
  const prevPagination = yield select(opinionDetailsSelectors.getChartPagination);
  const { minDate, step, maxStep } = prevPagination;
  let nextPagination = {};

  const nextStep = step + 1;

  if (nextStep <= maxStep) {
    switch (offset) {
      case DATE_OFFSET.YEAR: {
        const prevYear = addYears(new Date(minDate), -1);
        nextPagination = {
          ...prevPagination,
          ...calcYearOffset(prevYear),
          step: nextStep
        };
        break;
      }
      case DATE_OFFSET.MONTH: {
        const prevMonth = addMonths(new Date(minDate), -1);
        nextPagination = {
          ...prevPagination,
          ...calcMonthOffset(prevMonth),
          step: nextStep
        };
        break;
      }
      case DATE_OFFSET.WEEK: {
        const prevWeek = addWeeks(new Date(minDate), -1);
        nextPagination = {
          ...prevPagination,
          step: nextStep,
          ...calcWeekOffset(prevWeek)
        };
        break;
      }
      default:
    }

    yield put(calcChartOffset.success(nextPagination));
    yield call(getHistoryWorker);
  }
}

function* nextOffsetWorker() {
  const offset = yield select(opinionDetailsSelectors.getDateOffset);
  const prevPagination = yield select(opinionDetailsSelectors.getChartPagination);
  const { minDate, step } = prevPagination;
  let nextPagination = {};

  const nextStep = step - 1;

  if (nextStep >= 1) {
    switch (offset) {
      case DATE_OFFSET.YEAR: {
        const nextYear = addYears(new Date(minDate), 1);
        nextPagination = {
          ...prevPagination,
          ...calcYearOffset(nextYear),
          step: nextStep
        };
        break;
      }
      case DATE_OFFSET.MONTH: {
        const nextMonth = addMonths(new Date(minDate), 1);
        nextPagination = {
          ...prevPagination,
          ...calcMonthOffset(nextMonth),
          step: nextStep
        };
        break;
      }
      case DATE_OFFSET.WEEK: {
        const nextWeek = addWeeks(new Date(minDate), 1);
        nextPagination = {
          ...prevPagination,
          ...calcWeekOffset(nextWeek),
          step: nextStep
        };
        break;
      }
      default:
    }

    yield put(calcChartOffset.success(nextPagination));
    yield call(getHistoryWorker);
  }
}

function* changeOffsetWorker({ payload }) {
  const prevPagination = yield select(opinionDetailsSelectors.getChartPagination);
  const { minYearDate, maxYearDiff } = prevPagination;
  let nextPagination = {};
  const date = new Date();

  switch (payload) {
    case DATE_OFFSET.YEAR: {
      nextPagination = {
        ...prevPagination,
        ...calcYearOffset(date),
        granularity: DATE_GRANULARITY.MONTH,
        maxStep: maxYearDiff,
        step: 1
      };
      break;
    }
    case DATE_OFFSET.MONTH: {
      nextPagination = {
        ...prevPagination,
        ...calcMonthOffset(date),
        granularity: DATE_GRANULARITY.DAY,
        maxStep: calcMonthMaxStep(date, minYearDate),
        step: 1
      };
      break;
    }
    case DATE_OFFSET.WEEK: {
      nextPagination = {
        ...prevPagination,
        ...calcWeekOffset(date),
        granularity: DATE_GRANULARITY.DAY,
        maxStep: calcWeekMaxStep(date, minYearDate),
        step: 1
      };
      break;
    }
    default:
  }

  yield put(calcChartOffset.success(nextPagination));
  yield call(getHistoryWorker);
}

function* getCommentsWorker({ payload = {} }) {
  const { page = 1 } = payload;
  const { id, type } = yield select(opinionDetailsSelectors.selectedProfile);
  yield put(fetchOpinionComments.request({ isNext: page > 1 }));
  try {
    const comments =
      type === ROUTING_PARAMS.MANAGER
        ? yield call(ManagerService.getComments, { managerId: id, page, limit: 10 })
        : yield call(CompaniesService.getComments, { companyId: id, page, limit: 10 });

    const { pagination, results } = paginate({ currentPage: page, data: comments });

    yield put(fetchOpinionComments.success({ pagination, results }));
  } catch (err) {
    console.error(err);
    yield put(fetchOpinionComments.failure({ isNext: page > 1 }));
  }
}

function* getDetailsWorker({ payload }) {
  yield put(fetchOpinionDetails.request());
  try {
    const { id, type, criteriaId, subjectId, topicId } = payload;

    const data =
      type === ROUTING_PARAMS.MANAGER
        ? yield call(ManagerService.getCriteria, id)
        : yield call(CompaniesService.getCriteria, id);

    const normalize = normalizeCriteria(data);

    const selected = recursiveSelect(normalize, { criteriaId, subjectId, topicId });

    const profile = { type, id };

    yield put(setProfile.success(selected));
    yield put(fetchOpinionDetails.success({ data: normalize, profile }));

    yield fork(getCommentsWorker, {});
    yield fork(getHistoryWorker);
    yield fork(getOpinionGradesWorker);
    yield fork(getOpinionParticipationWorker);
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchOpinionDetails.failure());
  }
}

function* getOpinionGradesWorker() {
  yield put(fetchOpinionGrades.request());
  try {
    const profile = yield select(opinionDetailsSelectors.selectedProfile);
    const topic = yield select(opinionDetailsSelectors.selectedTopic);

    const grades =
      profile.type === ROUTING_PARAMS.MANAGER
        ? yield call(ShareOpinionService.getTopicGradesByManager, {
            id: profile.id,
            topic: topic.id
          })
        : yield call(ShareOpinionService.getTopicGradesByCompany, {
            id: profile.id,
            topic: topic.id
          });

    yield put(fetchOpinionGrades.success(grades));
  } catch (err) {
    console.error(err);
    yield put(fetchOpinionGrades.failure());
  }
}

function* getOpinionParticipationWorker() {
  yield put(fetchOpinionParticipation.request());
  try {
    const profile = yield select(opinionDetailsSelectors.selectedProfile);
    const topic = yield select(opinionDetailsSelectors.selectedTopic);

    const participation =
      profile.type === ROUTING_PARAMS.MANAGER
        ? yield call(ShareOpinionService.getTopicStatsByManager, {
            id: profile.id,
            topic: topic.id
          })
        : yield call(ShareOpinionService.getTopicStatsByCompany, {
            id: profile.id,
            topic: topic.id
          });

    yield put(fetchOpinionParticipation.success(participation));
  } catch (err) {
    console.error(err);
    yield put(fetchOpinionParticipation.failure());
  }
}

function* selectOptionWorker({ payload }) {
  const criteria = yield select(opinionDetailsSelectors.getCriteriaData);

  const oldCriteria = yield select(opinionDetailsSelectors.selectedCriteria);
  const oldSubject = yield select(opinionDetailsSelectors.selectedSubject);
  const oldTopic = yield select(opinionDetailsSelectors.selectedTopic);

  const { criteriaId, subjectId, topicId } = payload;

  const selected = recursiveSelect(criteria, {
    criteriaId: criteriaId || oldCriteria,
    subjectId: subjectId || oldSubject,
    topicId: topicId || oldTopic.id
  });

  yield put(setProfile.success(selected));
  yield fork(getOpinionGradesWorker);
  yield fork(getOpinionParticipationWorker);
  yield fork(getHistoryWorker);
  yield fork(getCommentsWorker, {});
}

export function* opinionDetailsWatcher() {
  yield all([
    takeLatest(setProfile.TRIGGER, getDetailsWorker),
    takeLatest(selectOption.TRIGGER, selectOptionWorker),

    takeLatest(setDateOffset.TRIGGER, changeOffsetWorker),
    takeLatest(handlePrevOffset.TRIGGER, prevOffsetWorker),
    takeLatest(handleNextOffset.TRIGGER, nextOffsetWorker),

    takeLatest(fetchOpinionComments.TRIGGER, getCommentsWorker)
  ]);
}
