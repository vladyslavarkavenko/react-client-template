import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';
import TopScoresChart from '../about/TopScoresChart';
import BlockWrapper from '../../profile/components/BlockWrapper';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <BlockWrapper title="Top Scores">
          <TopScoresChart />
        </BlockWrapper>
        <RadarContainer match={match} />
      </main>
      <aside className="sidebar">
        <SatisfiedClientsContainer match={match} />
      </aside>
    </section>
  );
}

export default Overview;
