import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../profile/components/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import ParticipationCircle from '../../profile/overview/ParticipationCircle';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

function ParticipationCircleContainer({ status, data, profileLabel }) {
  if (status === 'none' || status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper title="Participation share">
      {status === 'request' ? (
        <LoaderBlock height="20vh" />
      ) : (
        <ParticipationCircle data={data} profileLabel={profileLabel} />
      )}
    </BlockWrapper>
  );
}

const mapStateToProps = (state, { match }) => {
  const {
    params: { id }
  } = match;

  const { status, data } = companyProfileSelectors.stats(state);
  const { name } = companiesSelectors.getCurrentCompany(state, id);

  return {
    status,
    data,
    profileLabel: name
  };
};

export default connect(mapStateToProps)(ParticipationCircleContainer);
