import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { historyWatcherInit } from '../../modules/redirect/redirectActions';

class RedirectWatcher extends React.Component {
  componentDidMount() {
    const { history, historyWatcherInit } = this.props;

    historyWatcherInit({ history });
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname, search }
    } = this.props;

    const oldPath = `${pathname}${search}`;
    const newPath = `${prevProps.location.pathname}${prevProps.location.search}`;

    // watch location changes and reset scroll position
    if (oldPath !== newPath) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default compose(
  withRouter,
  connect(
    null,
    { historyWatcherInit }
  )
)(RedirectWatcher);
