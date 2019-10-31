import { all, fork } from 'redux-saga/effects';
import { companiesWatcher } from './modules/companies/companiesActions';
import { authWatcher } from './modules/auth/authActions';
import { redirectWatcher } from './modules/redirect/redirectActions';
import { shareOpinionWatcher } from './modules/shareOpinion/shareOpinionActions';
import { staffWatcher } from './modules/staff/staffActions';
import { clientsWatcher } from './modules/clients/clientsActions';
import { profileWatcher } from './modules/profile/profileActions';
import { managerProfileWatcher } from './modules/managerProfile/managerProfileActions';
import { companyProfileWatcher } from './modules/companyProfile/companyProfileActions';
import { dashboardWatcher } from './modules/dashboard/dashboardActions';
import { compareWatcher } from './modules/compare/compareActions';
import { staffStatisticsWatcher } from './modules/opinions/opinionsActions';
import { opinionDetailsWatcher } from './modules/opinionDetails/opinionDetailsActions';

export default function* rootSaga() {
  yield all([
    fork(compareWatcher),
    fork(authWatcher),
    fork(companiesWatcher),
    fork(redirectWatcher),
    fork(shareOpinionWatcher),
    fork(staffWatcher),
    fork(clientsWatcher),
    fork(profileWatcher),
    fork(managerProfileWatcher),
    fork(companyProfileWatcher),
    fork(opinionDetailsWatcher),
    fork(dashboardWatcher),
    fork(staffStatisticsWatcher)
  ]);
}
