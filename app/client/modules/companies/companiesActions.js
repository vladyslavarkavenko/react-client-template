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

function* updateCompanyWorker({ payload: { data, cb } }) {
  yield put(pushUpdateCompany.request());
  try {
    const company = yield call(() => CompaniesService.updateCompany(data));

    cb && cb();
    yield put(pushUpdateCompany.success(company));
  } catch (err) {
    console.error(err);
  }
}

export function* companiesWatcher() {
  yield all([takeLatest(pushUpdateCompany.TRIGGER, updateCompanyWorker)]);
}
