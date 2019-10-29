import React from 'react';

import BlockWrapper from '../../components/widgets/BlockWrapper';
import CompareWidget from './CompareWidget';
import ChartHeader from './ChartHeader';
import FilterSidebar from './filterSidebar/FilterSidebar';
import BenchmarkChartContainer from './BenchmarkChartContainer';

export default function Internal() {
  return (
    <section className="content-body">
      <main className="main">
        <ChartHeader />
        <BlockWrapper>
          <BenchmarkChartContainer />
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
