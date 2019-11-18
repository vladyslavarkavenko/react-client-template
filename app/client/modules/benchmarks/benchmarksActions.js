import { all, call, put, select, takeLatest, spawn } from 'redux-saga/effects';
import { ToastPosition } from 'react-toastify';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

import ShareOpinionService from '../../services/shareOpinion';
import Notification from '../../utils/notifications';
import CompaniesService from '../../services/companies';
import companiesSelectors from '../companies/companiesSelectors';
import benchmarksSelectors from './benchmarksSelectors';

export const prefix = 'benchmarks';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const toggleFilterSidebar = createOnlyTriggerBound('FILTER_SIDEBAR_TOGGLE');

export const selectFilter = createRequestBound('FILTER_SELECT');

export const fetchFilters = createRequestBound('FILTER_FETCH');
export const fetchBenchmarks = createRequestBound('BENCHMARK_FETCH');
export const fetchAllStaff = createRequestBound('STAFF_ALL_FETCH');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* fetchStaffWorker() {
  yield put(fetchBenchmarks.request());
  try {
    const selected = yield select(benchmarksSelectors.getSelectedFilters);
    const topics = selected.map((topic) => topic.id);

    const staff = yield call(CompaniesService.getStaffBenchmark, { topics });

    yield put(fetchBenchmarks.success(staff));
    if (topics.length === 0) {
      yield put(fetchAllStaff.success(staff));
    }
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchBenchmarks.failure());
  }
}

function* fetchFiltersWorker() {
  yield put(fetchFilters.request());
  try {
    const { id } = yield select(companiesSelectors.getCurrentCompany);

    yield spawn(fetchStaffWorker);
    const subjects = yield call(ShareOpinionService.getSubjectsByCompany, id);

    yield put(fetchFilters.success(subjects));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchFilters.failure());
  }
}

function* checkFilterLengthWorker({ payload }) {
  const state = yield select(benchmarksSelectors.getSelectedFilters);

  const idList = state.map((topic) => topic.id);

  if (idList.includes(payload.id)) {
    yield put(selectFilter.success(state.filter((topic) => topic.id !== payload.id)));
    return;
  }

  if (idList.length >= 5) {
    Notification.info('The limit of selected filters is 5', { position: ToastPosition.TOP_CENTER });
    return;
  }

  yield put(selectFilter.success([...state, payload]));
}

export function* benchmarkWatcher() {
  yield all([
    takeLatest(fetchFilters.TRIGGER, fetchFiltersWorker),
    takeLatest(selectFilter.TRIGGER, checkFilterLengthWorker),
    takeLatest(selectFilter.SUCCESS, fetchStaffWorker)
  ]);
}
