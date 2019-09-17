import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="nav-bar__logo">
    <img
      src="/assets/img/logo.png"
      alt="cTRU-Logo"
      className="logo"
    />
  </Link>
);

export default Logo;
