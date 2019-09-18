import React from 'react';
import { Link } from 'react-router-dom';
import routing from '../../utils/routing';

const Logo = () => (
  <Link to={routing().root} className="nav-bar__logo">
    <img src="/assets/img/logo.png" alt="cTRU-Logo" className="logo" />
  </Link>
);

export default Logo;
