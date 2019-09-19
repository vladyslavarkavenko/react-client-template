import React from 'react';
import { Route } from 'react-router-dom';
import AuthGuard from '../HOCs/AuthGuard';
import RolesManager from '../HOCs/RolesManager';
import TopBarWithProfile from '../ui-components/Layout/TopBarWithProfile';
import Sidebar from '../ui-components/Layout/Sidebar/Sidebar';

// TODO: Make different layout for login and other pages
function AuthRoute(props) {
  return (
    <>
      <TopBarWithProfile />
      <Sidebar />
      <Route {...props} />
    </>
  );
}

export default AuthGuard(RolesManager(AuthRoute));
