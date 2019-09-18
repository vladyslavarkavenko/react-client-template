import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearRedirect } from '../../../modules/redirect';

const RedirectTo = ({ to }) => (to ? <Redirect to={to} /> : null);

const mapStateToProps = (state) => ({
  to: state.redirect
});

export default connect(
  mapStateToProps,
  { clearRedirect }
)(RedirectTo);
