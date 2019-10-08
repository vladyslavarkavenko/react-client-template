import React from 'react';

import Radar from './overview/Radar';
import ContentBody from './components/ContentBody';

import RadarTitle from './overview/RadarTitle';
import SatisfiedClients from './overview/SatisfiedClients';

const Overview = ({
  managerGrades,
  getRadarScores,
  getSatisfiedClients,
  managerSatisfiedClients
}) => (
  <ContentBody
    main={[
      {
        title: <RadarTitle />,
        body: <Radar getRadarScores={getRadarScores} data={managerGrades} />
      }
    ]}
    sidebar={[
      {
        body: (
          <SatisfiedClients
            getSatisfiedClients={getSatisfiedClients}
            satisfiedClients={managerSatisfiedClients}
          />
        )
      }
    ]}
  />
);

export default Overview;
