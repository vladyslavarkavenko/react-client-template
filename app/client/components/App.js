import React from 'react';
import { Switch } from 'react-router-dom';
import routing from '../utils/routing';

import customLoadable from './customLoadable';
import SignInRoute from './Wrappers/SignInRoute';
import WrappedRoute from './Wrappers/WrappedRoute';
import AuthRoute from './Wrappers/AuthRoute';

const Login = customLoadable({ loader: () => import('../pages/Login') });
const Register = customLoadable({ loader: () => import('../pages/SignUp') });
const ChooseRole = customLoadable({ loader: () => import('../pages/ChooseRole') });
const Account = customLoadable({ loader: () => import('../pages/Account') });
const Profile = customLoadable({ loader: () => import('../pages/Profile') });
const Dashboard = customLoadable({ loader: () => import('../pages/Dashboard') });
const ShareOpinion = customLoadable({ loader: () => import('../pages/ShareOpinion') });
const ForgotPassword = customLoadable({ loader: () => import('../pages/ForgotPassword') });
const PageNotFound = customLoadable({ loader: () => import('../pages/PageNotFound') });

// additional subroutes
// Overview, About

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

      <AuthRoute exact path={routing().account} component={Account} />

      <AuthRoute exact path={routing().dashboard} component={Dashboard} />

      <AuthRoute exact path={routing().profile} component={Profile} />
      <AuthRoute exact path={routing().shareOpinion} component={ShareOpinion} />

      {/* TODO: Change to actual root */}
      <AuthRoute exact path={routing().root} component={Account} />

      <WrappedRoute exact path={routing().notFound} component={PageNotFound} />
      <WrappedRoute component={PageNotFound} />
    </Switch>
  );
}
