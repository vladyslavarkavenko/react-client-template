import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { historyWatcherInit } from '../../../modules/redirect/redirectActions';

// import { Redirect } from 'react-router-dom';

// import { clearRedirect } from '../../../modules/redirect';

class RedirectWatcher extends React.Component {
  componentDidMount() {
    const { history, historyWatcherInit } = this.props;

    historyWatcherInit({ history });
  }

  render() {
    return null;
  }
}
// const RedirectWatcher = ({ history }) => {
//   to ? <Redirect to={to} /> : null
// });

export default compose(
  withRouter,
  connect(
    null,
    { historyWatcherInit }
  )
)(RedirectWatcher);
