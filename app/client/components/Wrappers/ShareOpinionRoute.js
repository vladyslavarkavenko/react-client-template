import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import routing from '../../utils/routing';

function ShareOpinionRoute({
  step,
  selectedProfile,
  selectedTopics,
  nextUnratedTopic,
  ...otherProps
}) {
  if (!selectedProfile || !selectedTopics.length) {
    return <Redirect to={routing().shareOpinion} />;
  }

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
      <div className="chart-header">Header</div>
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
