import React from 'react';
import { connect } from 'react-redux';

import { ROLES } from '../constants';
import { updateCompany } from '../modules/companies';
import ProfileForAdmin from './profile/ProfileForAdmin';
import ProfileForAnalyst from './profile/ProfileForAnalyst';
import ProfileForManager from './profile/ProfileForManager';
import ProfileForCustomer from './profile/ProfileForCustomer';

const { ADMIN, MANAGER, ANALYST, CUSTOMER } = ROLES;

const Profile = (props) => {
  let Page;
  switch (props.activeRole) {
    case ADMIN:
      Page = ProfileForAdmin;
      break;
    case MANAGER:
      Page = ProfileForManager;
      break;
    case ANALYST:
      Page = ProfileForAnalyst;
      break;
    case CUSTOMER:
      Page = ProfileForCustomer;
      break;
    default:
      Page = null;
      break;
  }

  return (
    <div className="content">
      <Page {...props} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeRole: state.auth.activeRole,
  rolesPermissions: state.auth.rolesPermissions,
  companies: state.companies.companies
});

export default connect(
  mapStateToProps,
  { updateCompany }
)(Profile);
