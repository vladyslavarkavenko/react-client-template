import React from 'react';
import { Link } from 'react-router-dom';

import navLinks from './navLinks';

const Sidebar = () => (
  <ul className="left-bar">
    {navLinks.map(({ title, Icon, to }) => (
      <li key={title}>
        <Link to={to}>
          <Icon />
          {title}
        </Link>
      </li>
    ))}
  </ul>
);

export default Sidebar;
