import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import ParticipationCircle from '../../../components/widgets/ParticipationCircle';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';
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

  const { status, data } = managerProfileSelectors.stats(state);
  const { firstName, lastName } = companiesSelectors.getCurrentManager(state, id);

  return {
    status,
    data,
    profileLabel: `${firstName} ${lastName}`
  };
};

export default connect(mapStateToProps)(ParticipationCircleContainer);
