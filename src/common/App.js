import React from 'react';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import NavBar from './components/ui-components/Header';

// import './assets/svg/decor-rt.svg';
// import './assets/svg/decor-lb.svg';

// TODO: Make single webpack config for both server and client.
// TODO: Split all texts in locales files.
// TODO: Add stylelint before commits.

const App = () => (
  <>
    <Helmet>
      <title> cTRU </title>
      <meta name="description" content="cTRU" />
    </Helmet>

    <div>
      <NavBar />
      {renderRoutes(routes)}
    </div>
  </>
);

export default App;
