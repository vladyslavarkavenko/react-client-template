/* eslint-disable */
import React from 'react';
import { eachDayOfInterval, addMonths } from 'date-fns';
import { connect } from 'react-redux';

import { DATE_OFFSET } from '../../modules/opinionDetails/helpers/constants';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import RateChart from './RateChart';

function normalizePoints(history, dateOffset) {
  const importance = [];
  const satisfaction = [];

  history.forEach((point) => {
    const date = new Date(point.date);

    if (dateOffset === DATE_OFFSET.YEAR) {
      date.setDate(1);
    }

    date.setHours(0, 0, 0, 0);

    importance.push({
      x: date.getTime(),
      y0: 1,
      y: point.importance
    });

    satisfaction.push({
      x: date.getTime(),
      y0: 1,
      y: point.satisfaction
    });
  });

  return { importance, satisfaction };
}

function generateDomain(dateOffset, minDate, maxDate) {
  const start = new Date(minDate);
  const end = new Date(maxDate);
  let domain = [];

  switch (dateOffset) {
    case DATE_OFFSET.YEAR:
      start.setDate(1);
      const months = Array(12).fill(null);
      domain = months.map((_, index) => addMonths(start, index).getTime());
      break;
    case DATE_OFFSET.MONTH:
    case DATE_OFFSET.WEEK:
      domain = eachDayOfInterval({ start, end }).map((date) => date.getTime());
      break;
  }

  return domain;
}

function RateChartContainer({ status, history, pagination, visibleLines, dateOffset }) {
  const { minDate, maxDate } = pagination;
  const { importance, satisfaction } = normalizePoints(history, dateOffset);

  const domain = generateDomain(dateOffset, minDate, maxDate);

  const isRequest = status === 'request';

  // console.log(domain, importance);
  // console.log('___TEST____');
  // console.log('Domain', domain.map((item) => new Date(item)));
  // console.log('Points', importance.map((item) => new Date(item.x)));

  // if (status === 'request') {
  //   return null;
  // }

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
