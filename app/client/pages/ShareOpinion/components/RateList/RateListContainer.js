import React from 'react';
import { connect } from 'react-redux';
import RateList from './RateList';
import companiesSelectors from '../../../../modules/companies/companiesSelectors';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';
import { selectOpinionProfile } from '../../../../modules/shareOpinion/shareOpinionActions';

/* eslint-disable */
function RateListContainer({ companies, managers, selected, selectOpinionProfile }) {
  return (
    <RateList
      companies={companies}
      managers={managers}
      selected={selected}
      handleSelect={selectOpinionProfile}
    />
  );
}

const mapStateToProps = (state) => ({
  selected: shareOpinionSelectors.selectedProfile(state),
  companies: companiesSelectors.getCompaniesList(state),
  managers: companiesSelectors.getManagersList(state)
});

const mapDispatchToProps = {
  selectOpinionProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateListContainer);
