import React from 'react';
import { Route } from 'react-router-dom';

import AuthTopBar from '../ui-components/Layout/AuthTopBar';
import AuthBackground from '../ui-components/Layout/AuthBackground';
import NoAuthCheck from '../HOCs/NoAuthCheck';

function SignInRoute(props) {
  return (
    <>
      <AuthTopBar />
      <AuthBackground>
        <Route {...props} />
      </AuthBackground>
    </>
  );
}

export default NoAuthCheck(SignInRoute);
