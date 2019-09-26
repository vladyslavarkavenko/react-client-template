import React from 'react';
import { Link } from 'react-router-dom';
import routing from '../../../utils/routing';

const Logo = ({ className = 'nav-bar__logo', ...otherProps }) => (
  <Link to={routing().root} className={className} {...otherProps}>
    <img src="/assets/img/logo.png" alt="cTRU-Logo" className="logo" />
  </Link>
);

export default Logo;
