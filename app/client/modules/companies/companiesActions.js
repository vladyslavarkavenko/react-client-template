import { call, put, takeLatest, all } from 'redux-saga/effects';
import createRequestRoutine from '../helpers/createRequestRoutine';
import CompaniesService from '../../services/companies';

export const prefix = 'companies';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const setCompany = createRequestBound('SET_COMPANY');
export const setCompanies = createRequestBound('SET_COMPANIES');

function* updateCompanyWorker({ payload: { data, cb } }) {
  yield put(setCompany.request());
  try {
    // TODO: Check this.
    const res = yield call(() => CompaniesService.updateCompany(data));
    yield put(setCompany.success(res.data.company));
    cb();
  } catch (err) {
    console.error(err);
  }
}

export function* companiesWatcher() {
  yield all([takeLatest(setCompany.TRIGGER, updateCompanyWorker)]);
}
