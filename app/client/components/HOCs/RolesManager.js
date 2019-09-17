import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../ui-components/Loader';

export default (OriginalComponent) => {
  const MixedComponent = (props) => {
    const { rolesPermissions, activeRole } = props;

    if (rolesPermissions === null) {
      return <Loader />;
    }
    if (!activeRole) {
      return <Redirect to="/choose-role" />;
    }
    return <OriginalComponent {...props} />;
  };

  const mapStateToProps = state => ({
    activeRole: state.auth.activeRole,
    rolesPermissions: state.auth.rolesPermissions,
  });

  return connect(mapStateToProps)(MixedComponent);
};
