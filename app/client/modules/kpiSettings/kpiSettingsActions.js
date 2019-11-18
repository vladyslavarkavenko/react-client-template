/* eslint-disable */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';

import Notification from '../../utils/notifications';
import KpiService from '../../services/kpi';
import kpiSettingsSelectors from './kpiSettingsSelectors';
import normalizeSettings from './helpers/normalizeSettings';
import companiesSelectors from '../companies/companiesSelectors';
import CompaniesService from '../../services/companies';

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

function* fetchKpiSettingsWorker() {
  yield put(fetchStatistics.request());
  try {
    const { id } = yield select(companiesSelectors.getCurrentCompany);

    const [kpiRaw, statisticsRaw] = yield all([
      call(KpiService.getKpiSettings),
      call(CompaniesService.getStatistics, id)
    ]);

    const kpi = normalizeSettings(kpiRaw);
    const statistics = normalizeSettings(statisticsRaw);

    yield put(fetchStatistics.success({ kpi, statistics }));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchStatistics.failure());
  }
}

function* pushKpiSettingsWorker() {
  yield put(pushSaveChanges.request());
  try {
    const { participation, nps, satisfaction, ctru } = yield select(kpiSettingsSelectors.getInput);

    const kpi = yield call(KpiService.setKpiParam, {
      participationShare: participation,
      avgSatisfaction: satisfaction,
      ctruScore: ctru,
      nps
    });

    const normalize = normalizeSettings(kpi);

    Notification.success('The Changes have been saved');
    yield put(pushSaveChanges.success(normalize));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushSaveChanges.failure());
  }
}

export function* kpiSettingsWatcher() {
  yield all([
    takeLatest(fetchStatistics.TRIGGER, fetchKpiSettingsWorker),
    takeLatest(pushSaveChanges, pushKpiSettingsWorker)
  ]);
}
