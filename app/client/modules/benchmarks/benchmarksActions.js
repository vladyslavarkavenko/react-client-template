/* eslint-disable */
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

import ShareOpinionService from '../../services/shareOpinion';
import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';
import benchmarksSelectors from './benchmarksSelectors';
import { ToastPosition } from 'react-toastify';

export const prefix = 'benchmarks';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const toggleFilterSidebar = createOnlyTriggerBound('FILTER_SIDEBAR_TOGGLE');

export const selectFilter = createRequestBound('FILTER_SELECT');

export const fetchFilters = createRequestBound('FILTER_FETCH');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* fetchFiltersWorker() {
  yield put(fetchFilters.request());
  try {
    const { id } = yield select(companiesSelectors.getCurrentCompany);

    const subjects = yield call(ShareOpinionService.getSubjectsByCompany, id);

    yield put(fetchFilters.success(subjects));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchFilters.failure());
  }
}

function* checkFilterLengthWorker({ payload }) {
  const selected = yield select(benchmarksSelectors.getSelectedFilters);
  yield put(selectFilter.success(payload));

  if (selected.length === 5) {
    Notification.info('The limit of selected filters is 5', { position: ToastPosition.TOP_CENTER });
  }
}

export function* benchmarkWatcher() {
  yield all([
    takeLatest(fetchFilters.TRIGGER, fetchFiltersWorker),
    takeLatest(selectFilter.TRIGGER, checkFilterLengthWorker)
  ]);
}
