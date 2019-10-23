import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
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
      position={toast.POSITION.TOP_RIGHT}
      autoClose={4000}
    />
    <RedirectWatcher />
    {/* Other modules such as analytics */}
    <div className="app-wrap">{children}</div>
  </>
);

export default AppWrapper;
