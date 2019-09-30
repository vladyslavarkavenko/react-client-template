import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import routing from '../../utils/routing';
import Logo from '../ui-components/Layout/Logo';
import AuthGuard from '../HOCs/AuthGuard';
import RolesManager from '../HOCs/RolesManager';

function ShareOpinionRoute({ step, selectedProfile, selectedTopics, ...otherProps }) {
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

const mapStateToProps = (state) => ({
  selectedProfile: shareOpinionSelectors.selectedProfile(state),
  selectedTopics: shareOpinionSelectors.selectedTopics(state)
});

export default compose(
  AuthGuard,
  RolesManager,
  connect(mapStateToProps)
)(ShareOpinionRoute);
