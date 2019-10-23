import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import NAV_LINKS, { WORKING_NAV_LINKS } from './navLinks';
import authSelectors from '../../../../modules/auth/authSelectors';

const Sidebar = ({ role }) => (
  <ul className="nav-side-bar">
    {NAV_LINKS[role].map((data) => {
      const { title, Icon, to, isActive } = data;
      const className = WORKING_NAV_LINKS[role].indexOf(data) !== -1 ? '' : 'disable-events';

      return (
        <li key={title}>
          <NavLink
            exact
            isActive={isActive}
            to={to}
            activeClassName="active"
            className={`nav-link ${className}`}
          >
            <Icon />
            {title}
          </NavLink>
        </li>
      );
    })}
  </ul>
);

const mapStateToProps = (state) => ({
  role: authSelectors.activeRole(state)
});

export default withRouter(connect(mapStateToProps)(Sidebar));
