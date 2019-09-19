import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../ui-components/Layout/Loader';
import routing from '../../utils/routing';
import authSelectors from '../../modules/auth/authSelectors';

export default (OriginalComponent) => {
  const AuthGuardHOC = ({ isAuthorized, status, ...rest }) => {
    if (isAuthorized) {
      return <OriginalComponent {...rest} />;
    }

    if (status === 'request') {
      return <Loader />;
    }

    return <Redirect to={routing().login} />;
  };

  const mapStateToProps = (state) => ({
    isAuthorized: authSelectors.isAuth(state),
    status: authSelectors.status(state)
  });

  return connect(mapStateToProps)(AuthGuardHOC);
};
