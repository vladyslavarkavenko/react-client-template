import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../profile/components/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import CtruScoreCircle from '../../profile/overview/CtruScoreCircle';

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
  } = companyProfileSelectors.stats(state);
  const { name } = companiesSelectors.getCurrentCompany(state, id);

  return {
    status: 'success',
    // data,
    profileLabel: name,
    reviewsCount: numberOpinions
  };
};

export default connect(mapStateToProps)(CtruCircleContainer);
