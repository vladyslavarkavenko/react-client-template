import React from 'react';
import { connect } from 'react-redux';

import { ROLES } from '../utils/constants';
import { pushUpdateCompany } from '../modules/companies/companiesActions';
import ProfileForAdmin from './profile/ProfileForAdmin';
import ProfileForAnalyst from './profile/ProfileForAnalyst';
import ProfileForManager from './profile/ProfileForManager';
import ProfileForCustomer from './profile/ProfileForCustomer';
import authSelectors from '../modules/auth/authSelectors';
import companiesSelectors from '../modules/companies/companiesSelectors';

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
  activeRole: authSelectors.activeRole(state),
  rolesPermissions: authSelectors.rolesPermissions(state),
  companies: companiesSelectors.data(state)
});

const mapDispatchToProps = {
  // updateCompany
  pushUpdateCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
