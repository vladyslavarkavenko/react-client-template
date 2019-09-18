import { all, fork } from 'redux-saga/effects';
import { companiesWatcher } from './modules/companies/companiesActions';
import { authWatcher } from './modules/auth/authActions';

export default function* rootSaga() {
  yield all([fork(authWatcher), fork(companiesWatcher)]);
}
