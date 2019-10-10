import React from 'react';

import Radar from './overview/Radar';
import ContentBody from './components/ContentBody';

import RadarTitle from './overview/RadarTitle';
import SatisfiedClients from './overview/SatisfiedClients';

const Overview = ({ grades, getRadarScores, satisfiedClients }) => (
  <ContentBody
    main={[
      {
        title: <RadarTitle />,
        body: <Radar getRadarScores={getRadarScores} data={grades} />
      }
    ]}
    sidebar={[
      {
        body: <SatisfiedClients satisfiedClients={satisfiedClients} />
      }
    ]}
  />
);

export default Overview;
