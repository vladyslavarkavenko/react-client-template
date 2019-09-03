import React from 'react';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import NavBar from './components/ui-components/Header';

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
