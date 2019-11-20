import { combineReducers } from 'redux';
import device from './modules/device/deviceReducer';
import auth from './modules/auth/authReducer';
import companies from './modules/companies/companiesReducer';
import shareOpinion from './modules/shareOpinion/shareOpinionReducer';
import staff from './modules/staff/staffReducer';
import clients from './modules/clients/clientsReducer';
import managerProfile from './modules/managerProfile/managerProfileReducer';
import companyProfile from './modules/companyProfile/companyProfileReducer';
import profile from './modules/profile/profileReducer';
import opinionDetails from './modules/opinionDetails/opinionDetailsReducer';
import dashboard from './modules/dashboard/dashboardReducer';
import opinions from './modules/opinions/opinionsReducer';
import compare from './modules/compare/compareReducer';
import benchmarks from './modules/benchmarks/benchmarksReducer';
import customerDashboard from './modules/customerDashboard/customerDashboardReducer';
import kpiSettings from './modules/kpiSettings/kpiSettingsReducer';
import { pushLogout } from './modules/auth/authActions';

const appReducer = combineReducers({
  device,
  auth,
  companies,
  shareOpinion,
  staff,
  clients,
  profile,
  dashboard,
  managerProfile,
  companyProfile,
  opinions,

  opinionDetails,
  benchmarks,
  kpiSettings,
  customerDashboard,
  compare
});

export default (state, action) => {
  if (action.type === pushLogout.TRIGGER) {
    state = undefined;
  }

  return appReducer(state, action);
};
