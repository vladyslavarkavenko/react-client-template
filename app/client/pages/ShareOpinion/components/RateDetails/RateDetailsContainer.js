import React from 'react';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';

import RateDetails from './RateDetails';

function RateDetailsContainer({ selectedProfile, subjectsStatus, subjectsData }) {
  return (
    <RateDetails
      selectedProfile={selectedProfile}
      subjectsStatus={subjectsStatus}
      subjectsData={subjectsData}
    />
  );
}

const mapStateToProps = (state) => ({
  selectedProfile: shareOpinionSelectors.selectedProfile(state),
  subjectsStatus: shareOpinionSelectors.subjectsStatus(state),
  subjectsData: shareOpinionSelectors.subjectsData(state)
});

const mapDispatchToProps = {
  // selectOpinionProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateDetailsContainer);
