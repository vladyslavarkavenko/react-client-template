import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../profile/components/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import CtruScoreCircle from '../../../components/widgets/CtruScoreCircle';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';

function CtruCircleContainer({ status, profileLabel, reviewsCount }) {
  if (status === 'none' || status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper title="cTRU Score">
      {status === 'request' ? (
        <LoaderBlock height="20vh" />
      ) : (
        <CtruScoreCircle profileLabel={profileLabel} reviewsCount={reviewsCount} />
      )}
    </BlockWrapper>
  );
}

const mapStateToProps = (state, { match }) => {
  const {
    params: { id }
  } = match;
  const {
    data: { numberOpinions }
  } = managerProfileSelectors.stats(state);
  const { name } = companiesSelectors.getCurrentManager(state, id);

  return {
    status: 'success',
    // data,
    profileLabel: name,
    reviewsCount: numberOpinions
  };
};

export default connect(mapStateToProps)(CtruCircleContainer);
