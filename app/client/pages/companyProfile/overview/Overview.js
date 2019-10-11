import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';
import TopScoresContainer from './TopScoresContainer';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <TopScoresContainer />
        <RadarContainer />
      </main>
      <aside className="sidebar">
        <SatisfiedClientsContainer match={match} />
      </aside>
    </section>
  );
}

export default Overview;
