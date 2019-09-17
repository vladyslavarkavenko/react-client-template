import { Redirect } from 'react-router-dom';
import React from 'react';

import customLoadable from './components/customLoadable';


const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/account" />,
  },
  {
    path: '/registration',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Register'),
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
    path: '/choose-role',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/ChooseRole'),
    }),
  },
  {
    path: '/account',
    component: customLoadable({
      loader: () => import('./pages/Account'),
    }),
    routes: [
      {
        path: '/account',
        exact: true,
        component: () => <Redirect to="/account/profile" />,
      },
      {
        path: '/account/profile',
        exact: true,
        component: customLoadable({
          loader: () => import('./pages/Profile'),
        }),
      },
      {
        path: '/account/dashboard',
        exact: true,
        component: customLoadable({
          loader: () => import('./pages/Dashboard'),
        }),
      },
      {
        path: '/account/share-opinion',
        exact: true,
        component: customLoadable({
          loader: () => import('./pages/ShareOpinion'),
        }),
      },
    ],
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
