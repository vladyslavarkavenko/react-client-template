import React from 'react';
import { renderRoutes } from 'react-router-config';

import AuthGuard from '../components/HOCs/AuthGuard';
import RolesManager from '../components/HOCs/RolesManager';
import LeftBar from './account/LeftBar';
import TopBarWithProfile from './account/TopBarWithProfile';

const Account = ({ route: { routes } }) => (
  <>
    <TopBarWithProfile />
    <LeftBar />
    {renderRoutes(routes)}
  </>
);

export default AuthGuard(RolesManager(Account));
