import React from 'react';
import { connect } from 'react-redux';

import Radar from '../../profile/overview/Radar';
import RadarTitle from '../../profile/overview/RadarTitle';
import BlockWrapper from '../../profile/components/BlockWrapper';
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

const mapStateToProps = (state, props) => {
  const { match } = props;

  const {
    params: { id }
  } = match;
  const { status, data } = companyProfileSelectors.radar(state);

  return { status, data, id };
};

export default connect(mapStateToProps)(RadarContainer);
