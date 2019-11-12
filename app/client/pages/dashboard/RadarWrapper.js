import React from 'react';
import { connect } from 'react-redux';
import profileSelectors from '../../modules/profile/profileSelectors';
import { getRadarScores } from '../../modules/profile/profileActions';
import Radar from '../../components/widgets/radar/Radar';

const RadarWrapper = ({ detailsData, getRadarScores, radarData, status }) => (
  <Radar
    detailsData={detailsData}
    getRadarScores={getRadarScores}
    data={radarData}
    status={status}
  />
);

const mapStateToProps = (state) => ({
  radarData: profileSelectors.radarData(state),
  detailsData: profileSelectors.detailsData(state),
  status: profileSelectors.radarStatus(state)
});

export default connect(
  mapStateToProps,
  { getRadarScores }
)(RadarWrapper);
