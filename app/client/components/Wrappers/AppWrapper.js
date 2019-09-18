import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from "react-router-dom";

const AppWrapper = (props) => (
  <>
    <Helmet>
      <title>cTRU</title>
      <meta name="description" content="cTRU" />
    </Helmet>
    {/* Notification system */}
    {/* Other modules such as analytics */}
    <div className="app-wrap">
      {props.children}
    </div>
  </>
);

export default withRouter(AppWrapper);
