/* eslint-disable */
import React from 'react';

import AuthGuard from '../components/HOCs/AuthGuard';
import RolesManager from '../components/HOCs/RolesManager';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends React.Component {
  render() {
    return (
      <div className="content">
       Share your opinion
      </div>
    );
  }
}

export default AuthGuard(RolesManager(Profile));
