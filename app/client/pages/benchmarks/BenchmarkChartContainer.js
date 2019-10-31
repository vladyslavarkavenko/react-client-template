import React from 'react';
import { connect } from 'react-redux';

import BenchmarkChart from '../../components/widgets/benchmarkScores/BenchmarkChart';
import benchmarksSelectors from '../../modules/benchmarks/benchmarksSelectors';

function BenchmarkChartContainer({ selected }) {
  return <BenchmarkChart selected={selected} />;
}

const mapStateToProps = (state) => ({
  selected: benchmarksSelectors.getSelectedFilters(state)
});

export default connect(mapStateToProps)(BenchmarkChartContainer);
