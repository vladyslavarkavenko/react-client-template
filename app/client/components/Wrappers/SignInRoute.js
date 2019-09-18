import React from 'react';
import TopBar from '../ui-components/TopBar';
import Layout from '../ui-components/Layout';
import { Route } from 'react-router-dom';

// TODO: Make different layout for login and other pages
export default function SignInRoute(props) {
  return (
    <>
      <TopBar />
      <Layout>
        <Route {...props} />
      </Layout>
    </>
  );
}
