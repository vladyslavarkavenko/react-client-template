/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import RateChart from './RateChart';
import { minMaxRandom } from '../../utils/helpers';
import { setDateOffset } from '../../modules/opinionDetails/opinionDetailsActions';

const generateData = (min, max) => {
  const data = [];

  for (let i = 0; i <= 11; i++) {
    const date = new Date(Date.UTC(2000, i)).getTime();
    data.push({ x: date, y0: 1, y: minMaxRandom(min, max) });
  }

  return data;
};

class RateChartContainer extends React.Component {
  constructor(props) {
    super(props);

    this.importanceData = generateData(4, 6);
    this.satisfactionData = generateData(6, 9);
  }

  render() {
    return (
      <RateChart
        {...this.props}
        importanceData={this.importanceData}
        satisfactionData={this.satisfactionData}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: opinionDetailsSelectors.selectedCriteria(state),
    // data: opinionDetailsSelectors.getChartSliceData(state),
    visibleLines: opinionDetailsSelectors.getLineFilter(state),
    tickType: opinionDetailsSelectors.getDateOffset(state)
  };
};

export default connect(
  mapStateToProps,
  { setDateOffset }
)(RateChartContainer);
