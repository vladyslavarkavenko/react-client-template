import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../profile/components/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import TopScoresHeader from '../../profile/overview/TopScoresHeader';
import TopScoresChart from '../../profile/overview/TopScoresChart';

function TopScoresContainer({ status, data }) {
  if (status === 'none' || status === 'failure' || !data.length) {
    return null;
  }

  console.log(data);

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
