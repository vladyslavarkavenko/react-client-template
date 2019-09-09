import { Redirect } from 'react-router-dom';
import React from 'react';

import customLoadable from './components/customLoadable';

const routes = [
  {
    path: '/',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Dashboard'),
    }),
  },
  {
    path: '/login',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Login'),
    }),
  },
  {
    path: '/registration',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Register'),
    }),
  },
  {
    path: '/forgot-password',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/ForgotPassword'),
    }),
  },
  {
    path: '/404',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/PageNotFound'),
    }),
  },
  {
    path: '/',
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
