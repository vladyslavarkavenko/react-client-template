import React from 'react';
import { connect } from 'react-redux';

import Radar from '../../../components/widgets/radar/Radar';
import RadarTitle from '../../../components/widgets/radar/RadarTitle';
import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';

function RadarContainer({ status, data }) {
  if (status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper title={<RadarTitle />}>
      {status === 'request' ? <LoaderBlock height="20vh" /> : <Radar data={data} />}
    </BlockWrapper>
  );
}

const mapStateToProps = (state) => {
  const { status, data } = companyProfileSelectors.radar(state);

  return { status, data };
};

export default connect(mapStateToProps)(RadarContainer);
