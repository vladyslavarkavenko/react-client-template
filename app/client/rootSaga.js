import { all, fork } from 'redux-saga/effects';
import { companiesWatcher } from './modules/companies/companiesActions';
import { authWatcher } from './modules/auth/authActions';
import { redirectWatcher } from './modules/redirect/redirectActions';
import { shareOpinionWatcher } from './modules/shareOpinion/shareOpinionActions';
import { staffWatcher } from './modules/staff/staffActions';
import { managerWatcher } from './modules/manager/managerActions';

export default function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(companiesWatcher),
    fork(redirectWatcher),
    fork(shareOpinionWatcher),
    fork(staffWatcher),
    fork(managerWatcher)
  ]);
}
