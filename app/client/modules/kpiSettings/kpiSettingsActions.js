import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

import Notification from '../../utils/notifications';
import companiesSelectors from '../companies/companiesSelectors';
import CompaniesService from '../../services/companies';
import normalizeSettings from './helpers/normalizeSettings';

export const prefix = 'kpiSettings';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const setCtruValue = createRequestBound('CTRU_VALUE_SET');
export const setSatisfactionValue = createRequestBound('SATISFACTION_VALUE_SET');
export const setParticipationValue = createRequestBound('PARTICIPATION_VALUE_SET');
export const setNPSValue = createRequestBound('NPS_VALUE_SET');

export const pushSaveChanges = createRequestBound('SAVE_CHANGES_PUSH');
export const fetchStatistics = createRequestBound('STATISTICS_FETCH');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* fetchStatisticsWorker() {
  yield put(fetchStatistics.request());
  try {
    const { id } = yield select(companiesSelectors.getCurrentCompany);

    const statistics = yield call(CompaniesService.getStatistics, id);

    const normalize = normalizeSettings(statistics);

    yield put(fetchStatistics.success(normalize));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStatistics.failure());
  }
}

export function* kpiSettingsWatcher() {
  yield all([takeLatest(fetchStatistics.TRIGGER, fetchStatisticsWorker)]);
}
