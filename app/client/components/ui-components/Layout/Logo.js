import React from 'react';
import { Link } from 'react-router-dom';
import routing from '../../../utils/routing';

const Logo = ({ className, ...otherProps }) => (
  <Link to={routing().root} className={className} {...otherProps}>
    <img src="/assets/img/logo.png" alt="cTRU-Logo" />
  </Link>
);

export default Logo;
