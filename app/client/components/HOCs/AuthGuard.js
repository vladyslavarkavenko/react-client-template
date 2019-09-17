import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../ui-components/Loader';

export default (OriginalComponent) => {
  const MixedComponent = (props) => {
    const { isAuthorized } = props;
    if (isAuthorized === null) {
      return <Loader />;
    }
    return isAuthorized
      ? <OriginalComponent {...props} />
      : <Redirect to="/login" />;
  };

  const mapStateToProps = state => ({
    isAuthorized: state.auth.isAuthorized,
  });

  return connect(mapStateToProps)(MixedComponent);
};
