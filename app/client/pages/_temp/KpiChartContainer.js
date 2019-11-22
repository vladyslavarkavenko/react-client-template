/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import { setLineFilter } from '../../modules/dashboard/dashboardActions';

import normalizePoints from '../../modules/dashboard/helpers/normalizePoints';
import generateDomain from '../../modules/dashboard/helpers/generateDomain';
import KpiChart from './KpiChart';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';

function KpiChartContainer({ status, history, pagination, visibleLines, dateOffset, toggleLine }) {
  const { minDate, maxDate } = pagination;

  const dataMap =
    status === 'request' ? normalizePoints([], dateOffset) : normalizePoints(history, dateOffset);

  const domain = generateDomain(minDate);

  return (
    <KpiChart
      status={status}
      domain={domain}
      visibleLines={visibleLines}
      dataMap={dataMap}
      minDate={minDate}
      maxDate={maxDate}
      toggleLine={toggleLine}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    status: dashboardSelectors.getChartStatus(state),
    history: dashboardSelectors.getChartData(state),
    pagination: dashboardSelectors.getChartPagination(state),
    visibleLines: dashboardSelectors.getLineFilter(state)
  };
};

const mapDispatchToProps = {
  toggleLine: setLineFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KpiChartContainer);
