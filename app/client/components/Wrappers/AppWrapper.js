import React from 'react';
import { Helmet } from 'react-helmet';
import RedirectWatcher from '../ui-components/RedirectWatcher';

const AppWrapper = ({ children }) => (
  <>
    <Helmet>
      <title>cTRU</title>
      <meta name="description" content="cTRU" />
    </Helmet>

    <RedirectWatcher />
    {/* Notification system */}
    {/* Other modules such as analytics */}
    <div className="app-wrap">{children}</div>
  </>
);

export default AppWrapper;
