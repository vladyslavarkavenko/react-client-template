import React from 'react';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import TopBar from './components/ui-components/TopBar';
import Layout from './components/ui-components/Layout';

// TODO: Add stylelint before commits.
// TODO: Add favicon.
// TODO: Clean webpack configs, it seems that there is some redundant code.

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title> cTRU </title>
          <meta name="description" content="cTRU" />
        </Helmet>

        <div className="app-wrap">
          <TopBar />
          <Layout>
            {renderRoutes(routes)}
          </Layout>
        </div>
      </>
    );
  }
}

export default App;
