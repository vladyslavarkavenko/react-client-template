/* eslint-disable */
import React from 'react';

import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryArea
} from 'victory';

import { LINE_TYPES, DATE_OFFSET } from '../../../modules/opinionDetails/helpers/constants';
import { InlineSvgLoader } from '../../../components/ui-components/Layout/Loader';
import RateChartLegend from './RateChartLegend';

const config = {
  canvasX: 1000,
  canvasY: 450,

  padding: 0,

  strokeWidth: 2,
  interpolation: 'monotoneX',

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

const LineGradient = ({ name, color }) => {
  return (
    <linearGradient id={name} x1={0} y1={0} x2={0} y2={1}>
      <stop offset="0%" stopColor={color} stopOpacity={0.1} />
      <stop offset="25%" stopColor={color} stopOpacity={0.05} />
      <stop offset="75%" stopColor={color} stopOpacity={0.0} />
    </linearGradient>
  );
};

export default class RateChart extends React.Component {
  constructor(props) {
    super(props);

    this.formatTicks = this.formatTicks.bind(this);
  }

  formatTicks(tick) {
    const { tickType } = this.props;

    const tickDate = new Date(tick);

    switch (tickType) {
      case DATE_OFFSET.YEAR:
        return tickDate.toLocaleString('en-US', { month: 'short' });
      case DATE_OFFSET.MONTH:
        return tickDate.toLocaleString('en-US', { day: 'numeric' });
      case DATE_OFFSET.WEEK:
        return tickDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  render() {
    const {
      visibleLines,
      satisfactionData,
      importanceData,
      domain,
      status,
      minDate,
      maxDate
    } = this.props;
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

    const tickCount = domain.length;

    return (
      <div className="rate-chart">
        <RateChartLegend minDate={minDate} maxDate={maxDate} visibleLines={visibleLines} />
        <div className="rate-chart__wrapper">
          {status === 'request' && (
            <div className="screen-loader">
              <InlineSvgLoader />
            </div>
          )}
          <svg style={{ height: 0, position: 'absolute' }}>
            <defs>
              <LineGradient name={gradientKey} color={satisfaction.color} />
            </defs>
          </svg>
          <VictoryChart width={canvasX} height={canvasY} padding={35}>
            <VictoryAxis
              scale="linear"
              standalone={false}
              tickValues={domain}
              tickFormat={this.formatTicks}
              tickCount={tickCount}
              tickLabelComponent={<VictoryLabel textAnchor="middle" />}
              style={{
                axis: { stroke: 'transparent' },
                tickLabels: {
                  fontSize,
                  fontFamily,
                  fill: status === 'request' ? 'transparent' : fontColor
                }
              }}
            />
            <VictoryAxis
              dependentAxis
              domain={[1, 10.5]}
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

            {(importanceData.length !== 0 || satisfactionData.length !== 0) && (
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
                  />
                )}
              </VictoryGroup>
            )}
          </VictoryChart>
        </div>
      </div>
    );
  }
}
