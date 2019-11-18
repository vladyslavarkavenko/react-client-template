import React from 'react';
import { connect } from 'react-redux';

import normalizePoints from '../../../modules/opinionDetails/helpers/normalizePoints';
import generateDomain from '../../../modules/opinionDetails/helpers/generateDomain';
import opinionDetailsSelectors from '../../../modules/opinionDetails/opinionDetailsSelectors';
import RateChart from './rateChart/RateChart';

function RateChartContainer({ status, history, pagination, visibleLines, dateOffset }) {
  const { minDate, maxDate } = pagination;
  const { importance, satisfaction } = normalizePoints(history, dateOffset);

  const domain = generateDomain(dateOffset, minDate, maxDate);

  const isRequest = status === 'request';

  return (
    <RateChart
      status={status}
      domain={domain}
      tickType={dateOffset}
      visibleLines={visibleLines}
      importanceData={isRequest ? [] : importance}
      satisfactionData={isRequest ? [] : satisfaction}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    theme: opinionDetailsSelectors.selectedCriteria(state),
    status: opinionDetailsSelectors.getChartStatus(state),
    history: opinionDetailsSelectors.getChartData(state),
    pagination: opinionDetailsSelectors.getChartPagination(state),
    visibleLines: opinionDetailsSelectors.getLineFilter(state),
    dateOffset: opinionDetailsSelectors.getDateOffset(state)
  };
};

export default connect(mapStateToProps)(RateChartContainer);
