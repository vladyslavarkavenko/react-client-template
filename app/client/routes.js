import { Redirect } from 'react-router-dom';
import routing from './utils/routing';
import React from 'react';

import customLoadable from './components/customLoadable';

const routes = [
  {
    path: routing().root,
    exact: true,
    component: () => <Redirect to={routing().account} />
  },
  {
    path: routing().registration,
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Register')
    })
  },
  {
    path: routing().login,
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Login')
    })
  },
  {
    path: routing().chooseRole,
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/ChooseRole')
    })
  },
  {
    path: routing().account,
    component: customLoadable({
      loader: () => import('./pages/Account')
    }),
    routes: [
      {
        path: routing().account,
        exact: true,
        component: () => <Redirect to={routing().profile} />
      },
      {
        path: routing().profile,
        exact: true,
        component: customLoadable({
          loader: () => import('./pages/Profile')
        })
      },
      {
        path: routing().dashboard,
        exact: true,
        component: customLoadable({
          loader: () => import('./pages/Dashboard')
        })
      },
      {
        path: routing().shareOpinion,
        exact: true,
        component: customLoadable({
          loader: () => import('./pages/ShareOpinion')
        })
      }
    ]
  },
  {
    path: routing().forgotPassword,
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/ForgotPassword')
    })
  },
  {
    path: routing().notFound,
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/PageNotFound')
    })
  },
  {
    path: routing().root,
    component: () => <Redirect to={routing().notFound} />
  }
];

export default routes;
