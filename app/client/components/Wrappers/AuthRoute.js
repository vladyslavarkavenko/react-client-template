import React from 'react';
import { Route } from 'react-router-dom';
import AuthGuard from '../HOCs/AuthGuard';
import RolesManager from '../HOCs/RolesManager';
import TopBarWithProfile from '../../pages/account/TopBarWithProfile';
import LeftBar from '../../pages/account/LeftBar';

// TODO: Make different layout for login and other pages
function AuthRoute(props) {
  return (
    <>
      <TopBarWithProfile />
      <LeftBar />
      <Route {...props} />
    </>
  );
}

export default AuthGuard(RolesManager(AuthRoute));
