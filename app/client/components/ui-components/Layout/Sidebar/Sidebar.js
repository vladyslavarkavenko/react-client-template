import React from 'react';
import { NavLink } from 'react-router-dom';

import navLinks from './navLinks';

const Sidebar = () => (
  <ul className="nav-side-bar">
    {navLinks.map(({ title, Icon, to }) => (
      <li key={title}>
        <NavLink to={to} activeClassName="active" className="nav-link">
          <Icon />
          {title}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default Sidebar;
