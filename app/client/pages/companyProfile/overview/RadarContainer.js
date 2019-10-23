import React from 'react';
import { connect } from 'react-redux';

import { ROUTING_PARAMS } from '../../../utils/constants';
import Radar from '../../../components/widgets/radar/Radar';
import RadarTitle from '../../../components/widgets/radar/RadarTitle';
import BlockWrapper from '../../../components/widgets/BlockWrapper';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';

function RadarContainer({ status, data, detailsData }) {
  if (status === 'failure') {
    return null;
  }

  return (
    <BlockWrapper title={<RadarTitle />}>
      {status === 'request' ? (
        <LoaderBlock height="20vh" />
      ) : (
        <Radar data={data} detailsData={detailsData} />
      )}
    </BlockWrapper>
  );
}

const mapStateToProps = (state, { match }) => {
  const {
    params: { id }
  } = match;

  const { status, data } = companyProfileSelectors.radar(state);

  const detailsData = {
    type: ROUTING_PARAMS.COMPANY,
    id
  };

  return { status, data, detailsData };
};

export default connect(mapStateToProps)(RadarContainer);
