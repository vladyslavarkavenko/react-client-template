import React from 'react';

import AuthGuard from '../components/HOCs/AuthGuard';
import RolesManager from '../components/HOCs/RolesManager';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends React.Component {
  render() {
    return <div>Dashboard</div>;
  }
}

export default AuthGuard(RolesManager(Dashboard));
