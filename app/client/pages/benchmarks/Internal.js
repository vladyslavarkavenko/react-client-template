import React from 'react';
import BenchmarkChart from '../../components/widgets/benchmarkScores/BenchmarkChart';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import CompareWidget from './CompareWidget';
import ChartHeader from './ChartHeader';
import FilterSidebar from './filterSidebar/FilterSidebar';

export default function Internal() {
  return (
    <section className="content-body">
      <main className="main">
        <ChartHeader />
        <BlockWrapper>
          <BenchmarkChart />
        </BlockWrapper>
      </main>
      <aside className="sidebar">
        <BlockWrapper title="Compare">
          <CompareWidget />
        </BlockWrapper>
      </aside>
      <FilterSidebar />
    </section>
  );
}
