import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { pushTopicsRate } from '../../modules/shareOpinion/shareOpinionActions';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import routing from '../../utils/routing';
import Logo from '../ui-components/Layout/Logo';
import AuthGuard from '../HOCs/AuthGuard';
import RolesManager from '../HOCs/RolesManager';

class ShareOpinionRoute extends React.Component {
  componentWillUnmount() {
    const { clearState } = this.props;

    clearState();
  }

  render() {
    const { step, selectedProfile, selectedTopics, ...otherProps } = this.props;

    if (!selectedProfile || !selectedTopics.length) {
      return <Redirect to={routing().shareOpinion} />;
    }

    return (
      <>
        <header className="rate-opinion header">
          <Link to={routing().shareOpinion} replace className="header-btn">
            Cancel
          </Link>
          <Logo className="header-logo" replace />
          <button type="button" className="header-btn">
            Help
          </button>
        </header>
        <Route {...otherProps} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedProfile: shareOpinionSelectors.selectedProfile(state),
  selectedTopics: shareOpinionSelectors.selectedTopics(state)
});

const clearState = pushTopicsRate.success;

const mapDispatchToProps = {
  clearState
};

export default compose(
  AuthGuard,
  RolesManager,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ShareOpinionRoute);
