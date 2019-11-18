import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { ROUTING_PARAMS } from '../../utils/constants';
import createRequestRoutine from '../helpers/createRequestRoutine';
import CompaniesService from '../../services/companies';
import parseRadarScores from '../helpers/parseRadarScores';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import ManagerService from '../../services/manager';
import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';
import customerDashboardSelectors from './customerDashboardSelectors';

export const prefix = 'customerDashboard';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchRadarScores = createRequestBound('RADAR_SCORES_FETCH');
export const fetchCompanies = createRequestBound('COMPANIES_FETCH');
export const fetchManagers = createRequestBound('MANAGERS_FETCH');

export const selectRadarOption = createRequestBound('RADAR_OPTION_SELECT');

export const fetchAll = createRequestBound('FETCH_ALL');
export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getCompanyCtruTask(company) {
  try {
    const { ctruScore } = yield CompaniesService.getStatistics(company.id);
    return { ...company, ctruScore };
  } catch (err) {
    return company;
  }
}

function* getCompaniesWorker() {
  yield put(fetchCompanies.request());
  try {
    const companies = yield select(companiesSelectors.getCompaniesAsCustomer);

    const normalized = yield all(companies.map((company) => call(getCompanyCtruTask, company)));

    yield put(fetchCompanies.success(normalized));
  } catch (err) {
    console.error(err);
    yield put(fetchCompanies.failure());
  }
}

function* getManagerDataTask(manager) {
  try {
    const { userData, ctruScore, avgSatisfaction } = yield ManagerService.getProfile(manager.id);
    return { id: manager.id, ...userData, ctruScore, avgSatisfaction };
  } catch (err) {
    return {
      name: `${manager.firstName} ${manager.lastName}`,
      id: manager.id,
      avatar: manager.avatar
    };
  }
}

function* getManagersWorker() {
  yield put(fetchManagers.request());
  try {
    const managers = yield select(companiesSelectors.getManagersList);

    const normalized = yield all(managers.map((manager) => call(getManagerDataTask, manager)));

    yield put(fetchManagers.success(normalized));
  } catch (err) {
    console.error(err);
    yield put(fetchManagers.failure());
  }
}

function* getRadarScoresWorker() {
  yield put(fetchRadarScores.request());
  try {
    const { selected = {} } = yield select(customerDashboardSelectors.radar);

    const scores =
      selected.type === ROUTING_PARAMS.COMPANY
        ? yield call(CompaniesService.getRadarScores, selected.id)
        : yield call(ManagerService.getRadarScores, selected.id);

    const data = parseRadarScores(scores);

    yield put(fetchRadarScores.success(data));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchRadarScores.failure());
  }
}

//
function* fetchAllWorker() {
  yield put(fetchAll.request());
  const taskList = [getCompaniesWorker, getManagersWorker, getRadarScoresWorker];

  const companies = yield select(companiesSelectors.getCompaniesAsCustomer);
  const firstCompany = companies[0];

  yield put(
    selectRadarOption.success({
      value: firstCompany.id,
      id: firstCompany.id,
      label: firstCompany.name,
      type: ROUTING_PARAMS.COMPANY
    })
  );

  yield all(taskList.map((task) => call(task)));

  yield put(fetchAll.success());
}

export function* customerDashboardWatcher() {
  yield all([
    takeLatest(fetchAll.TRIGGER, fetchAllWorker),

    takeLatest(selectRadarOption.TRIGGER, getRadarScoresWorker)
  ]);
}
