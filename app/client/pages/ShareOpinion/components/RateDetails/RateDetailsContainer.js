import React from 'react';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';

import RateDetails from './RateDetails';

function RateDetailsContainer(props) {
  return <RateDetails {...props} />;
}

const mapStateToProps = (state) => ({
  selectedProfile: shareOpinionSelectors.selectedProfile(state),

  subjectsStatus: shareOpinionSelectors.subjectsStatus(state),
  subjectsData: shareOpinionSelectors.subjectsData(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateDetailsContainer);
