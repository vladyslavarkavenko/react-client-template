import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import RedirectWatcher from '../ui-components/RedirectWatcher';

const AppWrapper = ({ children }) => (
  <>
    <Helmet>
      <title>cTRU</title>
      <meta name="description" content="cTRU" />
    </Helmet>

    <ToastContainer
      className="custom-toast-container"
      toastClassName="custom-toast"
      bodyClassName="custom-toast__body"
      hideProgressBar
    />
    <RedirectWatcher />
    {/* Other modules such as analytics */}
    <div className="app-wrap">{children}</div>
  </>
);

export default AppWrapper;
