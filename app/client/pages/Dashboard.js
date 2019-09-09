import React from 'react';

import AuthGuard from '../components/HOCs/AuthGuard';

function Dashboard() {
  return <div> Dashboard </div>;
}

export default AuthGuard(Dashboard);
