import React from 'react';
import { connect } from 'react-redux';
import { selectOpinionTopic } from '../../../../modules/shareOpinion/shareOpinionActions';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';

import RateDetails from './RateDetails';

function RateDetailsContainer(props) {
  return <RateDetails {...props} />;
}

const mapStateToProps = (state) => ({
  selectedProfile: shareOpinionSelectors.selectedProfile(state),
  selectedTopicsId: shareOpinionSelectors.selectedTopicsId(state),

  subjectsStatus: shareOpinionSelectors.subjectsStatus(state),
  subjectsData: shareOpinionSelectors.subjectsData(state)
});

const mapDispatchToProps = {
  selectOpinionTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateDetailsContainer);
