import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchHistory, clearAll } from '../../modules/dashboard/dashboardActions';

import BlockWrapper from '../../components/widgets/BlockWrapper';
import KpiChartContainer from './KpiChartContainer';
import KpiChartControls from './KpiChartControls';

function Temp({ fetchHistory }) {
  useEffect(() => {
    fetchHistory();

    return () => clearAll();
  });

  return (
    <section className="content-body">
      <section className="main">
        <BlockWrapper className="kpi-chart" title={<KpiChartControls />}>
          <KpiChartContainer />
        </BlockWrapper>
      </section>
      <section className="sidebar">test</section>
    </section>
  );
}

export default connect(
  null,
  { fetchHistory }
)(Temp);
