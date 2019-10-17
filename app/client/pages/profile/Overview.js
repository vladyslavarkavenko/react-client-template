import React from 'react';

import Radar from '../../components/widgets/radar/Radar';
import ContentBody from './components/ContentBody';

import RadarTitle from '../../components/widgets/radar/RadarTitle';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';

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

export default Overview;
