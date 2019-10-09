import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <RadarContainer match={match} />
      </main>
      <aside className="sidebar">
        <SatisfiedClientsContainer match={match} />
      </aside>
    </section>
  );
}

export default Overview;
