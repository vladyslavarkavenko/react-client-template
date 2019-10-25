/* eslint-disable */
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

import ShareOpinionService from '../../services/shareOpinion';
import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'benchmarks';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const toggleFilterSidebar = createOnlyTriggerBound('FILTER_SIDEBAR_TOGGLE');

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

export function* benchmarkWatcher() {
  yield all([takeLatest(fetchFilters.TRIGGER, fetchFiltersWorker)]);
}
