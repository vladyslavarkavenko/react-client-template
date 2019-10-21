import React from 'react';
import { connect } from 'react-redux';

import Radar from '../../components/widgets/radar/Radar';
import ContentBody from './components/ContentBody';

import RadarTitle from '../../components/widgets/radar/RadarTitle';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';
import profileSelectors from '../../modules/profile/profileSelectors';
import { getRadarScores } from '../../modules/profile/profileActions';

const Overview = ({ radarData, getRadarScores, avgSatisfaction }) => (
  <ContentBody
    main={[
      {
        title: <RadarTitle />,
        body: () => <Radar getRadarScores={getRadarScores} data={radarData} />
      }
    ]}
    sidebar={[
      {
        body: () => <SatisfiedClients avgSatisfaction={avgSatisfaction} />
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  radarData: profileSelectors.radarData(state),
  avgSatisfaction: profileSelectors.avgSatisfaction(state)
});

export default connect(
  mapStateToProps,
  { getRadarScores }
)(Overview);
