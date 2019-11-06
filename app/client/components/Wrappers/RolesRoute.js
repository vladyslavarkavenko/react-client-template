import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthGuard from '../HOCs/AuthGuard';
import RolesManager from '../HOCs/RolesManager';
import TopBarWithProfile from '../ui-components/Layout/TopBarWithProfile';
import Sidebar from '../ui-components/Layout/Sidebar/Sidebar';
import routing from '../../utils/routing';
import { ROLES } from '../../utils/constants';

const { ADMIN, MANAGER, ANALYST, CUSTOMER } = ROLES;

function RolesRoute(props) {
  let PageComponent = null;

  const { forAdmin, forManager, forAnalyst, forCustomer, activeRole, ...otherProps } = props;

  switch (activeRole) {
    case ADMIN:
      PageComponent = forAdmin;
      break;
    case MANAGER:
      PageComponent = forManager;
      break;
    case ANALYST:
      PageComponent = forAnalyst;
      break;
    case CUSTOMER:
      PageComponent = forCustomer;
      break;
    default:
      PageComponent = <Redirect to={routing().notFound} />;
  }

  if (!PageComponent) {
    return <Redirect to={routing().notFound} />;
  }

  return (
    <>
      <TopBarWithProfile />
      <Sidebar />
      <section className="content main-content">
        <Route component={PageComponent} activeRole={activeRole} {...otherProps} />
      </section>
    </>
  );
}

export default AuthGuard(RolesManager(RolesRoute));
