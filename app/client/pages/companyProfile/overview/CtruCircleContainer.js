import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import CtruScoreCircle from '../../../components/widgets/CtruScoreCircle';

function CtruCircleContainer({ status, profileLabel, reviewsCount, ctruScore }) {
  if (status === 'none' || status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper title={`cTRU Score of ${profileLabel}`}>
      {status === 'request' ? (
        <LoaderBlock height="20vh" />
      ) : (
        <CtruScoreCircle
          profileLabel={profileLabel}
          reviewsCount={reviewsCount}
          ctruScore={ctruScore}
        />
      )}
    </BlockWrapper>
  );
}

const mapStateToProps = (state, { match }) => {
  const {
    params: { id }
  } = match;
  const {
    status,
    data: { numberOpinions, ctruScore }
  } = companyProfileSelectors.stats(state);
  const { name } = companiesSelectors.getCurrentCompany(state, id);

  return {
    status,
    ctruScore,
    profileLabel: name,
    reviewsCount: numberOpinions
  };
};

export default connect(mapStateToProps)(CtruCircleContainer);
