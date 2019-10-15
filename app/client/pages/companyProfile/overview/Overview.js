import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';
import TopScoresContainer from './TopScoresContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import CtruCircleContainer from './CtruCircleContainer';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <TopScoresContainer />
        <RadarContainer />
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
