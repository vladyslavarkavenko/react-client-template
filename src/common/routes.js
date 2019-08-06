import { Redirect } from 'react-router-dom';
import React from 'react';

// import { exampleAction } from './modules/example';
import customLoadable from './components/customLoadable';

const routes = [
  {
    path: '/',
    exact: true,
    component: customLoadable({
      loader: () => import('./pages/Home'),
    }),
  },
  // {
  //   path: '/example',
  //   exact: true,
  //   component: CustomLoadable({
  //     loader: () => import('./pages/Example'),
  //     modules: ['./pages/Example'],
  //     webpack: () => [require.resolveWeak('./pages/Example')],
  //   }),
  //   loadData(store) {
  //     return store.dispatch(exampleAction());
  //   }
  // },
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
