import { all, fork } from 'redux-saga/effects';
import { deviceWatcher } from './modules/device/deviceActions';
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
import { benchmarkWatcher } from './modules/benchmarks/benchmarksActions';
import { customerDashboardWatcher } from './modules/customerDashboard/customerDashboardActions';
import { kpiSettingsWatcher } from './modules/kpiSettings/kpiSettingsActions';

export default function* rootSaga() {
  yield all([
    fork(deviceWatcher),
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
    fork(staffStatisticsWatcher),
    fork(benchmarkWatcher),
    fork(customerDashboardWatcher),
    fork(kpiSettingsWatcher)
  ]);
}
