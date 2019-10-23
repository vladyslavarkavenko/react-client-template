import React from 'react';
import { connect } from 'react-redux';

import RateList from './rateListContainer/RateList';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';
import { selectOpinionProfile } from '../../../modules/shareOpinion/shareOpinionActions';
import { ROUTING_PARAMS } from '../../../utils/constants';

function RateListContainer(props) {
  return <RateList {...props} />;
}

const mapStateToProps = (state, props) => {
  let company;
  let manager;

  const {
    location: { search },
    match: {
      params: { id, type }
    }
  } = props;

  const paramsObj = new URLSearchParams(search.slice(1));

  const fastSelect = {
    isActive: false,
    subjectId: paramsObj.get(ROUTING_PARAMS.SUBJECT_ID),
    topicId: paramsObj.get(ROUTING_PARAMS.TOPIC_ID)
  };

  if (id && type === ROUTING_PARAMS.COMPANY) {
    company = companiesSelectors.getCurrentCompany(state, Number(id));
    fastSelect.isActive = true;
  }

  if (id && type === ROUTING_PARAMS.MANAGER) {
    manager = companiesSelectors.getCurrentManager(state, Number(id));
    fastSelect.isActive = true;
  }

  return {
    company,
    manager,
    fastSelect,
    selected: shareOpinionSelectors.selectedProfile(state),
    companies: companiesSelectors.getCompaniesAsCustomer(state),
    managers: companiesSelectors.getManagersList(state),
    globalExpired: shareOpinionSelectors.getGlobalExpired(state)
  };
};

const mapDispatchToProps = {
  handleSelect: selectOpinionProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateListContainer);
