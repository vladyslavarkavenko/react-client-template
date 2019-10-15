import React from 'react';

import Radar from './overview/Radar';
import ContentBody from './components/ContentBody';

import RadarTitle from './overview/RadarTitle';
import SatisfiedClients from './overview/SatisfiedClients';

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
