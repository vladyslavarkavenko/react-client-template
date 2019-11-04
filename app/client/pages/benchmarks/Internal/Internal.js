import React from 'react';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import ChartHeader from './ChartHeader';
import FilterSidebar from './FilterSidebar';
import BenchmarkChartContainer from './BenchmarkChartContainer';
import CompareWidgetContainer from './CompareWidgetContainer';

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
          <CompareWidgetContainer />
        </BlockWrapper>
      </aside>
      <FilterSidebar />
    </section>
  );
}
