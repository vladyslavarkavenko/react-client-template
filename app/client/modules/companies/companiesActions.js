import { call, put, takeLatest, all } from 'redux-saga/effects';
import createRequestRoutine from '../helpers/createRequestRoutine';
import CompaniesService from '../../services/companies';

export const prefix = 'companies';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const pushUpdateCompany = createRequestBound('COMPANY_UPDATE_PUSH');
export const setCompanies = createRequestBound('SET_COMPANIES');

function* updateCompanyWorker({ payload: { data, handleFinish } }) {
  yield put(pushUpdateCompany.request());
  try {
    // TODO: Check this.
    const company = yield call(() => CompaniesService.updateCompany(data));

    console.log(data, company);
    yield put(pushUpdateCompany.success(company));
    handleFinish();

  } catch (err) {
    console.error(err);
  }
}

export function* companiesWatcher() {
  yield all([takeLatest(pushUpdateCompany.TRIGGER, updateCompanyWorker)]);
}
