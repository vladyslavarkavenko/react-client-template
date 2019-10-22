import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../ui-components/Layout/Loader';
import routing from '../../utils/routing';
import authSelectors from '../../modules/auth/authSelectors';

export default (OriginalComponent) => {
  const NoAuthHOC = ({ isAuthorized, status, activeRole, rolesPermissions, ...rest }) => {
    if (!isAuthorized || rolesPermissions === null || !activeRole) {
      return <OriginalComponent {...rest} />;
    }

    if (status === 'request') {
      return <Loader />;
    }

    return <Redirect to={routing().about} />;
  };

  const mapStateToProps = (state) => ({
    isAuthorized: authSelectors.isAuth(state),
    activeRole: authSelectors.activeRole(state),
    rolesPermissions: authSelectors.rolesPermissions(state),
    status: authSelectors.status(state)
  });

  return connect(mapStateToProps)(NoAuthHOC);
};
