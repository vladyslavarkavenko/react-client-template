import React from 'react';
import { Link } from 'react-router-dom';

import routing from '../utils/routing';

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <hr />
      <Link to={routing().shareOpinionChart}>Share opinion chart</Link>
    </div>
  );
}
