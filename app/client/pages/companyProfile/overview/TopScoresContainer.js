import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import TopScoresHeader from '../../../components/widgets/topScores/TopScoresHeader';
import TopScoresChart from '../../../components/widgets/topScores/TopScoresChart';

function TopScoresContainer({ status, data }) {
  if (status === 'none' || status === 'failure' || !data.length) {
    return null;
  }

  return (
    <BlockWrapper title={<TopScoresHeader />}>
      {status === 'request' ? <LoaderBlock height="20vh" /> : <TopScoresChart data={data} />}
    </BlockWrapper>
  );
}

const mapStateToProps = (state) => {
  const { status, data } = companyProfileSelectors.topScores(state);
  return { status, data };
};

export default connect(mapStateToProps)(TopScoresContainer);
