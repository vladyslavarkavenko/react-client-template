import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import CtruScoreCircle from '../../../components/widgets/CtruScoreCircle';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';

function CtruCircleContainer({ status, profileLabel, reviewsCount, ctruScore, companyCtruScore }) {
  if (status === 'none' || status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper title={`cTRU Score of ${profileLabel}`}>
      {status === 'request' ? (
        <LoaderBlock height="20vh" />
      ) : (
        <CtruScoreCircle
          ctruScore={ctruScore}
          companyCtruScore={companyCtruScore}
          profileLabel={profileLabel}
          reviewsCount={reviewsCount}
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
    manager: { numberOpinions, ctruScore },
    company: { ctruScore: companyCtruScore }
  } = managerProfileSelectors.stats(state);
  const { firstName, lastName } = companiesSelectors.getCurrentManager(state, id);

  return {
    status,
    ctruScore,
    companyCtruScore,
    profileLabel: `${firstName} ${lastName}`,
    reviewsCount: numberOpinions
  };
};

export default connect(mapStateToProps)(CtruCircleContainer);
