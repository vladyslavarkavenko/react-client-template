import React from 'react';
import { connect } from 'react-redux';

import BenchmarkChart from '../../../components/widgets/benchmarkScores/BenchmarkChart';
import benchmarksSelectors from '../../../modules/benchmarks/benchmarksSelectors';
import { LoaderBlock } from '../../../components/ui-components/Layout/Loader';

function BenchmarkChartContainer({ selected, staff, status }) {
  if (status === 'request') {
    return <LoaderBlock height="650px" />;
  }

  return <BenchmarkChart selected={selected} staff={staff} />;
}

const mapStateToProps = (state) => ({
  selected: benchmarksSelectors.getSelectedFilters(state),
  staff: benchmarksSelectors.getStaff(state),
  status: benchmarksSelectors.getStaffStatus(state)
});

export default connect(mapStateToProps)(BenchmarkChartContainer);
