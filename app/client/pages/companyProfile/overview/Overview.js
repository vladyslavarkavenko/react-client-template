import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';
import TopScoresContainer from './TopScoresContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import CtruCircleContainer from './CtruCircleContainer';
import CommentsContainer from './CommentsContainer';
import BlockWrapper from '../../../components/widgets/BlockWrapper';
import MainCriteriaBlock from '../../../components/widgets/MainCriteriaBlock';

const mockSubjects = [
  { id: 7, name: 'Friendly - Banker', percentage: 90 },
  { id: 1, name: 'Interactive - E-banking', percentage: 80 },
  { id: 6, name: 'Good advice - Mortage', percentage: 75 },
  { id: 3, name: 'Clean - Branch', percentage: 65 }
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
        <CtruCircleContainer match={match} />
        <SatisfiedClientsContainer match={match} />
        <ParticipationCircleContainer match={match} />
        <BlockWrapper title="Most appreciated by clients with focus on">
          <MainCriteriaBlock data={mockSubjects} />
        </BlockWrapper>
      </aside>
    </section>
  );
}

export default Overview;
