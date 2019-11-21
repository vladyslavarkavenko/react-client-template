import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';

import TopScoresContainer from './TopScoresContainer';
import CtruCircleContainer from './CtruCircleContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import CommentsContainer from './CommentsContainer';
import MainCriteriaBlock from '../../../components/widgets/MainCriteriaBlock';
import BlockWrapper from '../../../components/widgets/BlockWrapper';

const mockSubjects = [
  { id: 2, name: 'Quality of investment advice', percentage: 90 },
  { id: 1, name: 'Pleasant', percentage: 80 },
  { id: 4, name: 'Creative', percentage: 75 },
  { id: 6, name: 'Explains product well', percentage: 65 }
];

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <TopScoresContainer />
        <RadarContainer match={match} />
        <CommentsContainer match={match} />
      </main>
      <aside className="sidebar">
        <SatisfiedClientsContainer match={match} />
        <CtruCircleContainer match={match} />
        <ParticipationCircleContainer match={match} />
        <BlockWrapper title="Most appreciated by clients with focus on">
          <MainCriteriaBlock data={mockSubjects} />
        </BlockWrapper>
      </aside>
    </section>
  );
}

export default Overview;
