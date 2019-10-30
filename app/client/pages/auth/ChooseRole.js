import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import i18next from 'i18next';

import ChooseRoleIcon from './chooseRole/ChooseRoleIcon';
import { setActiveRole } from '../../modules/auth/authActions';
import Loader from '../../components/ui-components/Layout/Loader';
import routing from '../../utils/routing';
import authSelectors from '../../modules/auth/authSelectors';
import { ROLES } from '../../utils/constants';

class ChooseRole extends React.Component {
  constructor(props) {
    super(props);

    this.setActiveRole = this.setActiveRole.bind(this);
  }

  setActiveRole(role) {
    const { setActiveRole } = this.props;

    setActiveRole(role);
  }

  render() {
    const { activeRole, rolesPermissions } = this.props;

    if (activeRole === ROLES.CUSTOMER) {
      return <Redirect to={routing().shareOpinion} />;
    }

    if (activeRole) {
      return <Redirect to={routing().about} />;
    }

    if (!rolesPermissions) {
      return <Loader />;
    }

    return (
      <div className="form-page choose-role-page">
        <div className="roles-content">
          <h1 className="form-page__title">{i18next.t('login.chooseRole')}</h1>
          <div className="cards">
            {Object.keys(rolesPermissions).map((role) => (
              <button key={role} onClick={() => this.setActiveRole(role)}>
                <ChooseRoleIcon role={role} />
                <h6>{role}</h6>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeRole: authSelectors.activeRole(state),
  rolesPermissions: authSelectors.rolesPermissions(state)
});

const mapDispatchToProps = {
  setActiveRole
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseRole);
