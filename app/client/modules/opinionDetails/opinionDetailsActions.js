import { put, takeLatest, all, call, select, fork } from 'redux-saga/effects';
import { min, max, differenceInYears, differenceInMonths } from 'date-fns';

import { ROUTING_PARAMS } from '../../utils/constants';
import Notification from '../../utils/notifications';
import ManagerService from '../../services/manager';
import ShareOpinionService from '../../services/shareOpinion';
import CompaniesService from '../../services/companies';
import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import normalizeCriteria from './helpers/normalizeCriteria';
import recursiveSelect from './helpers/recursiveSelect';
import opinionDetailsSelectors from './opinionDetailsSelectors';
import { DATE_OFFSET } from './helpers/constants';

export const prefix = 'opinionDetails';

const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchOpinionDetails = createRequestBound('OPINION_DETAILS_FETCH');

export const fetchOpinionParticipation = createRequestBound('OPINION_PARTICIPATION_FETCH');

export const setProfile = createRequestBound('PROFILE_SET');

export const selectOption = createRequestBound('OPTION_SELECT');

export const setLineFilter = createOnlyTriggerBound('C_LINE_FILTER_SET');
export const setDateOffset = createOnlyTriggerBound('C_DATE_OFFSET_SET');

export const calcChartOffset = createRequestBound('C_PAGINATION_CALC');

export const handleNextOffset = createOnlyTriggerBound('C_OFFSET_NEXT');
export const handlePrevOffset = createOnlyTriggerBound('C_OFFSET_PREV');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

/* eslint-disable */
function* calculatePaginationWorker() {
  yield put(calcChartOffset.request());

  const data = yield select(opinionDetailsSelectors.getChartRawData);
  const dateOffset = yield select(opinionDetailsSelectors.getDateOffset);

  const dates = data.map((item) => item.date);
  // const oldPagination = yield select(opinionDetailsSelectors.getChartPagination);

  let maxStep;

  const minDate = min(dates);
  const maxDate = max(dates);

  switch (dateOffset) {
    case DATE_OFFSET.YEAR:
      maxStep = differenceInYears(new Date(), minDate) + 1;
      break;
    case DATE_OFFSET.MONTH:
      maxStep = differenceInMonths(maxDate, minDate) + 1;
      break;
  }

  console.log({
    step: maxStep,
    maxStep: maxStep,
    minStep: 1,
    maxDate,
    minDate
  });

  yield put(
    calcChartOffset.success({
      step: maxStep,
      maxStep: maxStep,
      minStep: 1,
      maxDate,
      minDate
    })
  );
}

function* getDetailsWorker({ payload }) {
  yield put(fetchOpinionDetails.request());
  try {
    const { id, type, criteriaId, subjectId, topicId } = payload;

    let data;
    let comments;

    if (type === ROUTING_PARAMS.MANAGER) {
      [data, comments] = yield all([
        call(ManagerService.getCriteria, id),
        call(ManagerService.getComments, id)
      ]);
    } else {
      [data, comments] = yield all([
        call(CompaniesService.getCriteria, id),
        call(CompaniesService.getComments, id)
      ]);
    }

    const normalize = normalizeCriteria(data);

    const selected = recursiveSelect(normalize, { criteriaId, subjectId, topicId });

    const profile = { type, id };

    yield put(setProfile.success(selected));
    yield put(fetchOpinionDetails.success({ data: normalize, comments, profile }));

    yield fork(getOpinionParticipationWorker);
    yield call(calculatePaginationWorker);
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchOpinionDetails.failure());
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
  yield fork(getOpinionParticipationWorker);
}

export function* opinionDetailsWatcher() {
  yield all([
    takeLatest(setProfile.TRIGGER, getDetailsWorker),
    takeLatest(selectOption.TRIGGER, selectOptionWorker),
    takeLatest(calcChartOffset.TRIGGER, calculatePaginationWorker),
    takeLatest(setDateOffset.TRIGGER, calculatePaginationWorker)
  ]);
}
