import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// TODO: Make good looking loader.

export default (OriginalComponent) => {
  const MixedComponent = (props) => {
    const { isAuthorized } = props;
    if (isAuthorized === null) {
      console.log('Loading_1');
      return <div className="loading"> Loading... </div>;
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
