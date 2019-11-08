import React from 'react';
import { connect } from 'react-redux';

import Radar from '../../components/widgets/radar/Radar';
import ContentBody from './components/ContentBody';

import RadarTitle from '../../components/widgets/radar/RadarTitle';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';
import profileSelectors from '../../modules/profile/profileSelectors';
import { getRadarScores } from '../../modules/profile/profileActions';

const Overview = ({ radarData, getRadarScores, detailsData, avgSatisfaction }) => (
  <ContentBody
    main={[
      {
        title: <RadarTitle />,
        body: () => (
          <Radar detailsData={detailsData} getRadarScores={getRadarScores} data={radarData} />
        )
      }
    ]}
    sidebar={[
      {
        className: 'no-border',
        body: () => <SatisfiedClients avgSatisfaction={avgSatisfaction} />
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  radarData: profileSelectors.radarData(state),
  detailsData: profileSelectors.detailsData(state),
  avgSatisfaction: profileSelectors.avgSatisfaction(state)
});

export default connect(
  mapStateToProps,
  { getRadarScores }
)(Overview);
