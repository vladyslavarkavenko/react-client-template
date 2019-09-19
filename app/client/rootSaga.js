import { all, fork } from 'redux-saga/effects';
import { companiesWatcher } from './modules/companies/companiesActions';
import { authWatcher } from './modules/auth/authActions';
import redirectWatcher from './modules/redirect/redirectActions';

export default function* rootSaga() {
  yield all([fork(authWatcher), fork(companiesWatcher), fork(redirectWatcher)]);
}
