import React from 'react';
import { Route } from 'react-router-dom';
import AuthTopBar from '../ui-components/Layout/AuthTopBar';
import AuthBackground from '../ui-components/Layout/AuthBackground';

// TODO: Make different layout for login and other pages
export default function SignInRoute(props) {
  return (
    <>
      <AuthTopBar />
      <AuthBackground>
        <Route {...props} />
      </AuthBackground>
    </>
  );
}
