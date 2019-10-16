import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import TopScoresHeader from '../../../components/widgets/topScores/TopScoresHeader';
import TopScoresChart from '../../../components/widgets/topScores/TopScoresChart';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';

function TopScoresContainer({ status, data }) {
  if (status === 'failure' || !data.length) {
    return null;
  }

  return (
    <BlockWrapper title={<TopScoresHeader />}>
      {status === 'request' ? <LoaderBlock height="20vh" /> : <TopScoresChart data={data} />}
    </BlockWrapper>
  );
}

const mapStateToProps = (state) => {
  const { status, data } = managerProfileSelectors.topScores(state);
  return { status, data };
};

export default connect(mapStateToProps)(TopScoresContainer);
