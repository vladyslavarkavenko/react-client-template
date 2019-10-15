import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';
import TopScoresContainer from './TopScoresContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import CtruCircleContainer from './CtruCircleContainer';
import Comment from '../../../components/widgets/comment/Comment';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <TopScoresContainer />
        <RadarContainer />
        <Comment rate={6.5} id={1} />
        <Comment rate={8} id={2} />
        <Comment rate={3.5} id={3} />
      </main>
      <aside className="sidebar">
        <SatisfiedClientsContainer match={match} />
        <CtruCircleContainer match={match} />
        <ParticipationCircleContainer match={match} />
      </aside>
    </section>
  );
}

export default Overview;
