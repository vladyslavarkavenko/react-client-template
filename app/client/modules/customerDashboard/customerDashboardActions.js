/* eslint-disable */

import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import CompaniesService from '../../services/companies';
import parseRadarScores from '../helpers/parseRadarScores';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import ShareOpinionService from '../../services/shareOpinion';
import ManagerService from '../../services/manager';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'customerDashboard';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const fetchManagers = createRequestBound('MANAGERS_FETCH');

export const fetchAll = createRequestBound('FETCH_ALL');
export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getManagersWorker() {
  yield put(fetchManagers.request());
  try {
    // yield call(CompaniesService.getManagersList);

    const managers = yield select(companiesSelectors.getManagersList);
    const companies = yield select(companiesSelectors.getCompaniesAsCustomer);

    console.log(managers, companies);
    yield put(fetchManagers.success({ managers, companies }));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchManagers.failure());
  }
}

function* getRadarScoresWorker({ payload }) {
  yield put(fetchRadarScores.request());
  try {
    const scores = yield call(CompaniesService.getRadarScores, payload);

    const data = parseRadarScores(scores);

    yield put(fetchRadarScores.success(data));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchRadarScores.failure());
  }
}

//
function* fetchAllWorker() {
  yield put(fetchAll.request());
  const taskList = [getManagersWorker, getRadarScoresWorker];

  yield all(taskList.map((task) => call(task, { payload: 1 })));

  yield put(fetchAll.success());
}

export function* customerDashboardWorker() {
  yield all([
    takeLatest(fetchAll.TRIGGER, fetchAllWorker),

    takeLatest(fetchRadarScores.TRIGGER, getRadarScoresWorker),
    takeLatest(fetchManagers.TRIGGER, getManagersWorker)
  ]);
}
