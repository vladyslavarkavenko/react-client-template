import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../components/HOCs/AuthGuard';
import RolesManager from '../components/HOCs/RolesManager';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        Dashboard
        <Redirect to="/profile" />
      </div>
    );
  }
}

export default AuthGuard(RolesManager(Dashboard));
