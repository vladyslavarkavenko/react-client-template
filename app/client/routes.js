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
    path: '/choose-role',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/ChooseRole'),
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
    path: '/profile',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Profile'),
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
