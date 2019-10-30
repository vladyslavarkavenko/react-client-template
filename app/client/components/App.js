import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import routing from '../utils/routing';
import customLoadable from './customLoadable';
import SignInRoute from './Wrappers/SignInRoute';
import WrappedRoute from './Wrappers/WrappedRoute';
import AuthRoute from './Wrappers/AuthRoute';
import RolesRoute from './Wrappers/RolesRoute';
import ShareOpinionRoute from './Wrappers/ShareOpinionRoute';

const Login = customLoadable({
  loader: () => import('../pages/auth/Login')
});
const Register = customLoadable({
  loader: () => import('../pages/auth/SignUp')
});
const ChooseRole = customLoadable({
  loader: () => import('../pages/auth/ChooseRole')
});
const Account = customLoadable({
  loader: () => import('../pages/account/Account')
});
const Opinions = customLoadable({
  loader: () => import('../pages/opinions/Opinions')
});
const ProfileForAdmin = customLoadable({
  loader: () => import('../pages/profile/ProfileForAdmin')
});
const ProfileForAnalyst = customLoadable({
  loader: () => import('../pages/profile/ProfileForAnalyst')
});
const ProfileForManager = customLoadable({
  loader: () => import('../pages/profile/ProfileForManager')
});
const ProfileForCustomer = customLoadable({
  loader: () => import('../pages/profile/ProfileForCustomer')
});

const ManagerProfile = customLoadable({
  loader: () => import('../pages/managerProfile/ManagerProfile')
});

const CompanyProfile = customLoadable({
  loader: () => import('../pages/companyProfile/CompanyProfile')
});

const Dashboard = customLoadable({ loader: () => import('../pages/dashboard/Dashboard') });
const ShareOpinion = customLoadable({
  loader: () => import('../pages/shareOpinion/Subjects')
});
const ShareOpinionChart = customLoadable({
  loader: () => import('../pages/shareOpinion/Chart')
});
const ShareOpinionMessage = customLoadable({
  loader: () => import('../pages/shareOpinion/Reviews')
});

const ForgotPassword = customLoadable({
  loader: () => import('../pages/auth/ForgotPassword')
});
const ResetPassword = customLoadable({
  loader: () => import('../pages/auth/ResetPassword')
});

const Staff = customLoadable({
  loader: () => import('../pages/staff/Staff')
});

const Clients = customLoadable({
  loader: () => import('../pages/clients/Clients')
});

const OpinionDetails = customLoadable({
  loader: () => import('../pages/opinionDetails/OpinionDetails')
});

const Benchmarks = customLoadable({
  loader: () => import('../pages/benchmarks/Benchmarks')
});

const PageNotFound = customLoadable({
  loader: () => import('../pages/notFound/NotFound')
});

// additional subroutes
// Overview, CompanyAbout

// TODO: Add stylelint before commits.
// TODO: Clean webpack configs, it seems that there is some redundant code.
// TODO: Add local environment.

export default function App() {
  return (
    <Switch>
      <SignInRoute exact path={routing().login} component={Login} />
      <SignInRoute exact path={routing().registration} component={Register} />
      <SignInRoute exact path={routing().chooseRole} component={ChooseRole} />
      <SignInRoute exact path={routing().forgotPassword} component={ForgotPassword} />
      <SignInRoute exact path={routing().resetPassword} component={ResetPassword} />
      <AuthRoute exact path={routing().account} component={Account} />
      <AuthRoute exact path={routing().dashboard} component={Dashboard} />
      {/*<AuthRoute exact path={routing().profile} component={Profile} />*/}
      <RolesRoute
        exact
        path={routing().profile}
        forAdmin={ProfileForAdmin}
        forAnalyst={ProfileForAnalyst}
        forManager={ProfileForManager}
        forCustomer={ProfileForCustomer}
      />

      <AuthRoute exact path={routing().managerProfile} component={ManagerProfile} />
      <AuthRoute exact path={routing().companyProfile} component={CompanyProfile} />
      <AuthRoute exact path={routing().opinions} component={Opinions} />
      <RolesRoute exact path={routing().staff} forAdmin={Staff} />
      <RolesRoute exact path={routing().clients} forAdmin={Clients} />
      <RolesRoute exact path={routing().benchmarks} forAdmin={Benchmarks} />
      <RolesRoute exact path={routing().benchmarksWithTab} forAdmin={Benchmarks} />

      {/* Share your opinion */}
      <AuthRoute exact path={routing().shareOpinion} component={ShareOpinion} />
      <AuthRoute exact path={routing().shareOpinionWithProfile} component={ShareOpinion} />

      <AuthRoute exact path={routing().opinionDetails} component={OpinionDetails} />
      <RolesRoute exact path={routing().myOpinionDetails} forManager={OpinionDetails} />

      <ShareOpinionRoute
        exact
        path={routing().shareOpinionChart}
        step={2}
        component={ShareOpinionChart}
      />
      <ShareOpinionRoute
        exact
        path={routing().shareOpinionMessage}
        step={3}
        component={ShareOpinionMessage}
      />

      <AuthRoute exact path={routing().root} render={() => <Redirect to={routing().overview} />} />
      <WrappedRoute exact path={routing().notFound} component={PageNotFound} />
      <WrappedRoute component={PageNotFound} />
    </Switch>
  );
}
