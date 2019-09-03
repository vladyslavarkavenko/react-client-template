import { createStore, applyMiddleware } from 'redux';
import { getBundles } from 'react-loadable/webpack';
import { matchRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
// import proxy from 'express-http-proxy';
import thunk from 'redux-thunk';
import express from 'express';
import React from 'react';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import stats from '../../dist/react-loadable.json';
import reducers from './reduxReducers';
import routes from '../common/routes';
import App from '../common/App';

const content = fs.readFileSync(path.resolve('./dist/ssr-template.txt'), 'utf8');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.resolve('./dist')));

const preloadData = (location, store) => {
  const branch = matchRoutes(routes, location);

  const promises = branch.map(({ route, match }) => {
    if (route) {
      return route.loadData
        ? route.loadData(store, match)
        : Promise.resolve();
    }
    return undefined;
  });

  return Promise.all(promises);
};

app.get('*', (req, res) => {
  const modules = [];
  const context = {};
  const store = createStore(reducers, applyMiddleware(thunk));

  preloadData(req.url, store).then(() => {
    const html = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>,
    );

    const bundles = getBundles(stats, modules);
    const helmet = Helmet.renderStatic();
    let filledContent = content;

    filledContent = filledContent.replace('<!--title-->', helmet.title.toString());
    filledContent = filledContent.replace('<!--meta-->', helmet.meta.toString());
    filledContent = filledContent.replace('<!--html-->', html);
    filledContent = filledContent.replace('{/*preload_state*/}', serialize(store.getState()));
    filledContent = filledContent.replace('<!--scripts-->', bundles.map(bundle => `<script src="/${bundle.file}"> </script>`).join('\n'));

    res.status(200).send(filledContent);
  });
});


Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}).catch((err) => {
  console.log(err);
});
