// import { createStore, applyMiddleware } from 'redux';
// import { getBundles } from 'react-loadable/webpack';
// import { matchRoutes } from 'react-router-config';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom';
// import serialize from 'serialize-javascript';
// import { Provider } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import Loadable from 'react-loadable';
import proxy from 'express-http-proxy';
// import thunk from 'redux-thunk';
import express from 'express';
import React from 'react';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// eslint-disable-next-line import/no-unresolved
// import createSagaMiddleware from 'redux-saga';
// import stats from '../../public/react-loadable.json';
// import reducers from './reduxReducers';
// import routes from '../client/routes';
// import App from '../client/App';
import CONFIG from '../client/utils/config';

const { PORT, API_URL } = CONFIG;

const content = fs.readFileSync(path.resolve('./public/ssr-template.txt'), 'utf8');

const app = express();

app.use(cors());
app.use(express.static(path.resolve('./public')));

// TODO: We have Nginx for that in prod.
app.use(
  '/api',
  proxy(API_URL, {
    proxyReqPathResolver: (req) => `/api${req.url}`
  })
);
app.use(
  '/media',
  proxy(API_URL, {
    proxyReqPathResolver: (req) => `/media${req.url}`
  })
);
app.use(
  '/static',
  proxy(API_URL, {
    proxyReqPathResolver: (req) => `/static${req.url}`
  })
);

// const preloadData = (location, store) => {
//   const branch = matchRoutes(routes, location);
//
//   const promises = branch.map(({ route, match }) => {
//     if (route) {
//       return route.loadData ? route.loadData(store, match) : Promise.resolve();
//     }
//     return undefined;
//   });
//
//   return Promise.all(promises);
// };

app.get('*', (req, res) => {
  // const modules = [];
  // const context = {};
  // const sagaMiddleware = createSagaMiddleware();
  // const store = createStore(reducers, applyMiddleware(thunk, sagaMiddleware));

  // preloadData(req.url, store).then(() => {
  // const html = renderToString(
  //   <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
  //     <Provider store={store}>
  //       <StaticRouter location={req.url}>
  //         <App />
  //       </StaticRouter>
  //     </Provider>
  //   </Loadable.Capture>
  // );

  // const bundles = getBundles(stats, modules);
  // const helmet = Helmet.renderStatic();
  // let filledContent = content;
  //
  // filledContent = filledContent.replace('<!--title-->', helmet.title.toString());
  // filledContent = filledContent.replace('<!--meta-->', helmet.meta.toString());
  // filledContent = filledContent.replace('<!--html-->', html);
  // filledContent = filledContent.replace('{/*preload_state*/}', serialize(store.getState()));
  // // filledContent = filledContent.replace(
  //   '<!--scripts-->',
  //   bundles.map((bundle) => `<script src="/${bundle.file}"> </script>`).join('\n')
  // );

  // res.status(200).send(filledContent);
  // });
  res.set('Content-Type', 'text/html');
  res.send(content);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// Loadable.preloadAll()
//   .then(() => {
//
