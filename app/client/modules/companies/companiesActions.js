import { call, put, takeLatest, all } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import createToggleRoutine from '../helpers/createToggleRoutine';
import CompaniesService from '../../services/companies';

export const prefix = 'companies';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const pushUpdateCompany = createRequestBound('COMPANY_UPDATE_PUSH');
export const setCompanies = createRequestBound('SET_COMPANIES');
export const editModeCompanies = createToggleRoutine(prefix, 'EDIT_MODE');
export const updateCompany = createRequestBound('COMPANY_UPDATE');
export const setCompanyErrors = createRequestBound('COMPANY_SET_ERRORS');

function* updateCompanyWorker({ payload: { data } }) {
  yield put(pushUpdateCompany.request());
  try {
    // TODO: Check this.
    const company = yield call(() => CompaniesService.updateCompany(data));

    yield put(pushUpdateCompany.success(company));
    yield put(editModeCompanies.toggle());
  } catch (err) {
    console.error(err);
  }
}

export function* companiesWatcher() {
  yield all([takeLatest(pushUpdateCompany.TRIGGER, updateCompanyWorker)]);
}
