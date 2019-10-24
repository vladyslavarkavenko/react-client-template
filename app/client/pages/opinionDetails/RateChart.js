/* eslint-disable */
import React from 'react';

import { differenceInWeeks, differenceInMonths, differenceInDays } from 'date-fns';

import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryGroup,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryArea
} from 'victory';
import { connect } from 'react-redux';

import { COLORS } from '../../utils/constants';
import { lightenDarkenColor, minMaxRandom } from '../../utils/helpers';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import { LINE_TYPES, DATE_OFFSET } from '../../modules/opinionDetails/helpers/constants';
import { setDateOffset } from '../../modules/opinionDetails/opinionDetailsActions';

const config = {
  canvasX: 1000,
  canvasY: 450,

  padding: 0,

  strokeWidth: 2,
  interpolation: 'catmullRom',

  rateDomain: [1, 10],
  rateTicks: 10,

  satisfaction: {
    color: '#F57575'
  },

  importance: {
    color: '#938cf5',
    strokeDasharray: 5
  },

  baseColor: '#3ea0da',
  fontColor: '#808fa3',
  gridColor: '#808fa3',
  fontSize: '14px',
  fontFamily: 'Muli'
};

const generateDomain = () => {
  const domain = [];

  for (let i = 0; i <= 11; i++) {
    const date = new Date(2000, i);
    domain.push(date);
  }

  return domain;
};

const generatePoints = (arr) => {
  const importanceData = [];
  const satisfactionData = [];

  arr.forEach((item) => {
    const date = new Date(item.date);

    importanceData.push({
      x: date,
      y0: 1,
      y: item.importance
    });

    satisfactionData.push({
      x: date,
      y0: 1,
      y: item.satisfaction
    });
  });

  return { importanceData, satisfactionData };
};

const LineGradient = ({ name, color }) => {
  return (
    <linearGradient id={name} x1={0} y1={0} x2={0} y2={1}>
      <stop offset="0%" stopColor={color} stopOpacity={0.1} />
      <stop offset="25%" stopColor={color} stopOpacity={0.05} />
      <stop offset="75%" stopColor={color} stopOpacity={0.0} />
    </linearGradient>
  );
};

class RateChart extends React.Component {
  constructor(props) {
    super(props);

    this.now = new Date();

    this.handleZoom = this.handleZoom.bind(this);
    this.formatTicks = this.formatTicks.bind(this);
    this.getTickCount = this.getTickCount.bind(this);
  }

  handleZoom(domain) {
    const { tickType, setDateOffset } = this.props;

    const diffMonths = differenceInMonths(domain.x[1], domain.x[0]);

    if (diffMonths >= 6) {
      if (tickType !== DATE_OFFSET.YEAR) {
        setDateOffset(DATE_OFFSET.YEAR);
        // this.setState({
        //   tickType: DATE_OFFSET.YEAR
        // });
      }
      return;
    }

    const diffWeeks = differenceInWeeks(domain.x[1], domain.x[0]);
    if (diffMonths < 6 && diffWeeks > 4) {
      if (tickType !== DATE_OFFSET.MONTH) {
        setDateOffset(DATE_OFFSET.MONTH);
        // this.setState({
        //   tickType: DATE_OFFSET.MONTH
        // });
      }

      return;
    }

    if (diffWeeks <= 4) {
      if (tickType !== DATE_OFFSET.WEEK) {
        setDateOffset(DATE_OFFSET.WEEK);
        // this.setState({
        //   selectedDomain: domain,
        //   tickType: DATE_OFFSET.WEEK
        // });
      }

      return;
    }
  }

  formatTicks(tick) {
    const { tickType } = this.props;

    switch (tickType) {
      case DATE_OFFSET.YEAR:
        return tick.toLocaleString('en-US', { month: 'short' });
      case DATE_OFFSET.MONTH:
        return tick.toLocaleString('en-US', { month: 'short', day: '2-digit' });
      case DATE_OFFSET.WEEK:
        return tick.toLocaleString('en-US', { month: 'long', day: '2-digit' });
    }
  }

  getTickCount() {
    const { tickType } = this.props;

    switch (tickType) {
      case DATE_OFFSET.YEAR:
        return 12;
      case DATE_OFFSET.MONTH:
        return 10;
      case DATE_OFFSET.WEEK:
        return 7;
    }
  }

  render() {
    const { visibleLines, satisfactionData, importanceData } = this.props;
    const {
      padding,
      canvasX,
      canvasY,
      fontColor,
      gridColor,
      fontFamily,
      fontSize,
      strokeWidth,
      importance,
      satisfaction,
      interpolation
    } = config;

    const gradientKey = 'opinion_details_grad_1';

    const tickCount = this.getTickCount();

    console.log(this.props.tickType);

    return (
      <div className="rate-chart">
        <div className="rate-chart__wrapper">
          <svg style={{ height: 0 }}>
            <defs>
              <LineGradient name={gradientKey} color={satisfaction.color} />
            </defs>
          </svg>
          <VictoryChart
            width={canvasX}
            height={canvasY}
            scale={{ x: 'time' }}
            padding={30}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                minimumZoom={{ x: 604800000 }}
                onZoomDomainChange={this.handleZoom}
                downsample={12}
              />
            }
          >
            <VictoryAxis
              // domain={[1, 12]}
              // domain={generateDomain()}
              standalone={false}
              tickFormat={this.formatTicks}
              tickCount={tickCount}
              tickLabelComponent={<VictoryLabel textAnchor="middle" />}
              style={{
                axis: { stroke: 'transparent' },
                tickLabels: { fontSize, fontFamily, fill: fontColor }
              }}
            />
            <VictoryAxis
              dependentAxis
              domain={[1, 10]}
              standalone={false}
              tickLabelComponent={<VictoryLabel dx={-10} textAnchor="middle" />}
              tickCount={10}
              style={{
                axis: {
                  stroke: 'transparent'
                },
                grid: {
                  stroke: gridColor,
                  strokeOpacity: 0.3
                },
                tickLabels: {
                  fontSize: fontSize,
                  fontFamily: fontFamily,
                  fill: fontColor
                }
              }}
            />

            <VictoryGroup>
              {visibleLines.includes(LINE_TYPES.IMPORTANCE) && (
                <VictoryArea
                  style={{
                    data: {
                      fill: `url(#${gradientKey})`,
                      stroke: satisfaction.color,
                      strokeWidth
                    },
                    parent: { border: '1px solid #ccc' }
                  }}
                  interpolation={interpolation}
                  data={satisfactionData}
                  // data={satisfactionData}
                />
              )}

              {visibleLines.includes(LINE_TYPES.SATISFACTION) && (
                <VictoryLine
                  style={{
                    data: {
                      stroke: importance.color,
                      strokeDasharray: importance.strokeDasharray,
                      strokeWidth
                    },
                    parent: { border: '1px solid #ccc' }
                  }}
                  interpolation={interpolation}
                  data={importanceData}
                  // data={importanceData}
                />
              )}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default RateChart;
