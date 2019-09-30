import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import routing from '../../utils/routing';
import Logo from '../ui-components/Layout/Logo';

function ShareOpinionRoute({
  step,
  selectedProfile,
  selectedTopics,
  nextUnratedTopic,
  ...otherProps
}) {
  // if (!selectedProfile || !selectedTopics.length) {
  //   return <Redirect to={routing().shareOpinion} />;
  // }

  // TODO: Make redirect if user has used history.back
  // if (step === 2 && !nextUnratedTopic) {
  //   return <Redirect to={routing().shareOpinion} />;
  // }
  // Step after chart
  if (step === 3 && nextUnratedTopic) {
    return <Redirect to={routing().shareOpinionChart} />;
  }

  return (
    <>
      <header className="rate-opinion header">
        <Link to={routing().shareOpinion} replace type="button" className="header-btn">
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
  selectedTopics: shareOpinionSelectors.selectedTopics(state),
  nextUnratedTopic: shareOpinionSelectors.nextUnratedTopic(state)
});

export default connect(mapStateToProps)(ShareOpinionRoute);
