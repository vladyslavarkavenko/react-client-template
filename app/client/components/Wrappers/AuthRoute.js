import React from 'react';
import { Route } from 'react-router-dom';
import AuthGuard from '../HOCs/AuthGuard';
import RolesManager from '../HOCs/RolesManager';
import TopBarWithProfile from '../ui-components/Layout/TopBarWithProfile';
import Sidebar from '../ui-components/Layout/Sidebar/Sidebar';

function AuthRoute(props) {
  return (
    <>
      <TopBarWithProfile />
      <Sidebar />
      <section className="content main-content">
        <Route {...props} />
      </section>
    </>
  );
}

export default AuthGuard(RolesManager(AuthRoute));
