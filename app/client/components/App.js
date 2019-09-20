import React from 'react';
import { Switch } from 'react-router-dom';
import routing from '../utils/routing';

import customLoadable from './customLoadable';
import SignInRoute from './Wrappers/SignInRoute';
import WrappedRoute from './Wrappers/WrappedRoute';
import AuthRoute from './Wrappers/AuthRoute';
import RolesRoute from './Wrappers/RolesRoute';

const Login = customLoadable({ loader: () => import('../pages/Auth/Login') });
const Register = customLoadable({ loader: () => import('../pages/Auth/SignUp') });
const ChooseRole = customLoadable({ loader: () => import('../pages/Auth/ChooseRole/ChooseRole') });
const Account = customLoadable({ loader: () => import('../pages/Account') });
// const Profile = customLoadable({ loader: () => import('../pages/Profile') });
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

const Dashboard = customLoadable({ loader: () => import('../pages/Dashboard') });
const ShareOpinion = customLoadable({ loader: () => import('../pages/ShareOpinion') });
const ForgotPassword = customLoadable({
  loader: () => import('../pages/Auth/ForgotPassword/ForgotPassword')
});
const ResetPassword = customLoadable({
  loader: () => import('../pages/Auth/ResetPassword/ResetPassword')
});
const PageNotFound = customLoadable({ loader: () => import('../pages/PageNotFound') });

// additional subroutes
// Overview, CompanyAbout

// TODO: Add stylelint before commits.
// TODO: Add favicon.
// TODO: Clean webpack configs, it seems that there is some redundant code.
// TODO: Add local environment.
// TODO: Choose better default avatar.

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
      <AuthRoute exact path={routing().shareOpinion} component={ShareOpinion} />

      {/* TODO: Change to actual root */}
      <AuthRoute exact path={routing().root} component={Account} />

      <WrappedRoute exact path={routing().notFound} component={PageNotFound} />
      <WrappedRoute component={PageNotFound} />
    </Switch>
  );
}
