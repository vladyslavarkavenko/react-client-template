import React from 'react';
import BenchmarkChart from '../../components/widgets/benchmarkScores/BenchmarkChart';
import BlockWrapper from '../../components/widgets/BlockWrapper';

export default function Internal() {
  return (
    <section className="content-body">
      <main className="main">
        {/*<span>Bankers</span>*/}
        <BlockWrapper title="Bankers">
          <BenchmarkChart />
        </BlockWrapper>
      </main>
      <aside className="sidebar">Compare</aside>
    </section>
  );
}
