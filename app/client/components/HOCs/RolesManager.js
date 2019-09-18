import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../ui-components/Loader';
import routing from '../../utils/routing';
import authSelectors from '../../modules/auth/authSelectors';

export default (OriginalComponent) => {
  const RolesManagerHOC = (props) => {
    const { rolesPermissions, activeRole } = props;

    if (rolesPermissions === null) {
      return <Loader />;
    }
    if (!activeRole) {
      return <Redirect to={routing().chooseRole}/>;
    }

    console.log(activeRole);

    return <OriginalComponent {...props} />;
  };

  const mapStateToProps = (state) => ({
    activeRole: authSelectors.activeRole(state),
    rolesPermissions: authSelectors.rolePermissions(state)
  });

  return connect(mapStateToProps)(RolesManagerHOC);
};
