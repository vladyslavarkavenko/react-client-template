import React from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { setActiveRole } from '../modules/auth';
import AuthGuard from '../components/HOCs/AuthGuard';
import { ROLES } from '../constants';

import SvgAdmin from '../../../public/assets/svg/admin.svg';
import SvgAnalyst from '../../../public/assets/svg/analyst.svg';
import SvgCustomer from '../../../public/assets/svg/customer.svg';
import SvgManager from '../../../public/assets/svg/manager.svg';

const {
  CUSTOMER,
  ADMIN,
  ANALYST,
  MANAGER,
} = ROLES;

const Icon = ({ role }) => {
  switch (role) {
    case CUSTOMER:
      return <SvgCustomer />;
    case ADMIN:
      return <SvgAdmin />;
    case ANALYST:
      return <SvgAnalyst />;
    case MANAGER:
      return <SvgManager />;
    default:
      return null;
  }
};

class ChooseRole extends React.Component {
  constructor(props) {
    super(props);

    this.setActiveRole = this.setActiveRole.bind(this);
  }

  setActiveRole(role) {
    const { setActiveRole, history } = this.props;

    setActiveRole(role);
    history.push('/');
  }

  render() {
    const { activeRole, rolesPermissions } = this.props;

    if (activeRole) {
      return <Redirect to="/" />;
    }

    return (
      <div className="form-page choose-role-page">
        <div className="content">
          <h1 className="form-page__title"> Choose your role </h1>
          <div className="cards">
            {
              rolesPermissions
              && Object.keys(rolesPermissions)
                .map(role => (
                  <button
                    key={role}
                    onClick={() => this.setActiveRole(role)}
                  >
                    <Icon role={role} />
                    <h6>{role}</h6>
                  </button>
                ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeRole: state.auth.activeRole,
  rolesPermissions: state.auth.rolesPermissions,
});

const mapDispatchToProps = dispatch => ({
  setActiveRole: data => dispatch(setActiveRole(data)),
});

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(ChooseRole));
