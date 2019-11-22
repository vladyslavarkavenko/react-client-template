/* eslint-disable */

import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import StaffService from '../../services/staff';
import CompaniesService from '../../services/companies';
import companiesSelectors from '../companies/companiesSelectors';
import normalizeStaff from './helpers/normalizeStaff';
import { addYears, addMonths } from 'date-fns';
import calcYearOffset from '../opinionDetails/helpers/calcYearOffset';
import trimDate from '../opinionDetails/helpers/trimDate';
import { minMaxRandom } from '../../utils/helpers';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import dashboardSelectors from './dashboardSelectors';

export const prefix = 'dashboard';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchActiveStaff = createRequestBound('FETCH_ACTIVE_STAFF');
export const fetchStatistics = createRequestBound('STATISTICS_FETCH');
export const fetchFeedback = createRequestBound('FEEDBACK_FETCH');
export const fetchTop = createRequestBound('TOP_FETCH');

export const fetchHistory = createRequestBound('KPI_HISTORY_FETCH');

export const setLineFilter = createOnlyTriggerBound('C_LINE_FILTER_SET');
export const setYearOffset = createOnlyTriggerBound('C_YEAR_OFFSET_SET');

export const calcChartOffset = createRequestBound('C_PAGINATION_CALC');
export const handleNextOffset = createOnlyTriggerBound('C_OFFSET_NEXT');
export const handlePrevOffset = createOnlyTriggerBound('C_OFFSET_PREV');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* generateMockData(options) {
  const { start } = options;

  const points = [];

  console.log(start);

  const date = new Date(start);
  date.setHours(0, 0, 0, 0);

  for (let i = 0; i < 12; i++) {
    const pointDate = addMonths(date, i);

    const point = {
      date: trimDate(pointDate),
      ctruScore: minMaxRandom(1, 10),
      avgSatisfaction: minMaxRandom(0, 100),
      participationShare: minMaxRandom(0, 100),
      nps: minMaxRandom(-100, 100)
    };

    points.push(point);
  }

  yield delay(250);

  console.log(points);

  return points;
}

function* getHistoryWorker() {
  yield put(fetchHistory.request());
  try {
    const { minDate, maxDate, granularity } = yield select(dashboardSelectors.getChartPagination);

    const historyOptions = {
      start: minDate,
      end: maxDate,
      granularity: granularity //Always M
    };

    const history = yield call(generateMockData, historyOptions);
    // const history = yield call(ShareOpinionService.getOpinionHistory, historyOptions);

    yield put(fetchHistory.success(history));
  } catch (err) {
    console.error(err);
    yield put(fetchHistory.failure());
  }
}

function* prevYearOffsetWorker() {
  const prevPagination = yield select(dashboardSelectors.getChartPagination);
  const { minDate, step, maxStep } = prevPagination;
  let nextPagination = {};

  const nextStep = step + 1;

  if (nextStep <= maxStep) {
    const prevYear = addYears(new Date(minDate), -1);
    nextPagination = {
      ...prevPagination,
      ...calcYearOffset(prevYear),
      step: nextStep
    };

    yield put(calcChartOffset.success(nextPagination));
    yield call(getHistoryWorker);
  }
}

function* nextYearOffsetWorker() {
  const prevPagination = yield select(dashboardSelectors.getChartPagination);
  const { minDate, step } = prevPagination;
  let nextPagination = {};

  const nextStep = step - 1;

  if (nextStep >= 1) {
    const nextYear = addYears(new Date(minDate), 1);
    nextPagination = {
      ...prevPagination,
      ...calcYearOffset(nextYear),
      step: nextStep
    };

    yield put(calcChartOffset.success(nextPagination));
    yield call(getHistoryWorker);
  }
}

function* getActiveStaffWorker() {
  yield put(fetchActiveStaff.request());
  try {
    const data = yield call(StaffService.getActiveStaff);
    const stats = yield all(
      data
        .filter(({ isManager }) => isManager)
        .map(({ id }) => call(CompaniesService.getManager, id))
    );

    const normalized = normalizeStaff(stats);

    yield put(fetchActiveStaff.success(normalized));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchActiveStaff.failure());
  }
}

function* getStatisticsWorker() {
  yield put(fetchStatistics.request());
  try {
    const company = yield select(companiesSelectors.getCurrentCompany);
    const stats = yield call(CompaniesService.getStatistics, company.id);

    yield put(fetchStatistics.success(stats));
  } catch (err) {
    console.error(err);
    yield put(fetchStatistics.failure());
  }
}

function* getFeedbackWorker() {
  yield put(fetchFeedback.request());
  try {
    const feedback = yield call(CompaniesService.getFeedback);

    yield put(fetchFeedback.success(feedback));
  } catch (err) {
    console.error(err);
    yield put(fetchFeedback.failure());
  }
}

function* getTopWorker({ payload: { key } }) {
  yield put(fetchTop.request({ key }));
  try {
    const top = yield call(CompaniesService.getTop, key);

    yield put(fetchTop.success({ key, data: { [key]: top } }));
  } catch (err) {
    console.error(err);
    yield put(fetchTop.failure({ key }));
  }
}

export function* dashboardWatcher() {
  yield all([
    takeLatest(fetchActiveStaff.TRIGGER, getActiveStaffWorker),
    takeLatest(fetchStatistics.TRIGGER, getStatisticsWorker),
    takeLatest(fetchFeedback.TRIGGER, getFeedbackWorker),
    takeEvery(fetchTop.TRIGGER, getTopWorker),

    takeLatest(fetchHistory.TRIGGER, getHistoryWorker),
    takeLatest(handlePrevOffset.TRIGGER, prevYearOffsetWorker),
    takeLatest(handleNextOffset.TRIGGER, nextYearOffsetWorker)
  ]);
}
