import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';
import TopScoresContainer from './TopScoresContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import CtruCircleContainer from './CtruCircleContainer';
import CommentsList from '../../../components/widgets/comment/CommentsList';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <TopScoresContainer />
        <RadarContainer />
        <CommentsList />
      </main>
      <aside className="sidebar">
        <CtruCircleContainer match={match} />
        <SatisfiedClientsContainer match={match} />
        <ParticipationCircleContainer match={match} />
      </aside>
    </section>
  );
}

export default Overview;
