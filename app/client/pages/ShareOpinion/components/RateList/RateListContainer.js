import React from 'react';
import { connect } from 'react-redux';
import RateList from './RateList';
import companiesSelectors from '../../../../modules/companies/companiesSelectors';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';
import { selectOpinionProfile } from '../../../../modules/shareOpinion/shareOpinionActions';

/* eslint-disable */
function RateListContainer(props) {
  return <RateList {...props} />;
}

const mapStateToProps = (state) => ({
  selected: shareOpinionSelectors.selectedProfile(state),
  companies: companiesSelectors.getCompaniesList(state),
  managers: companiesSelectors.getManagersList(state)
});

const mapDispatchToProps = {
  handleSelect: selectOpinionProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateListContainer);
