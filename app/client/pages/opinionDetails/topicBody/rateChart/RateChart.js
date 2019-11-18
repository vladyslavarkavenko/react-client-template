import React from 'react';

import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryArea
} from 'victory';

import { LINE_TYPES, DATE_OFFSET } from '../../../../modules/opinionDetails/helpers/constants';
import { InlineSvgLoader } from '../../../../components/ui-components/Layout/Loader';

import defaultConfig from './config';
import LineGradient from '../../../../components/ui-components/LineGradient';
import RateChartLegend from './RateChartLegend';

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
      default:
        return '';
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
      maxDate,
      config = defaultConfig
    } = this.props;

    const {
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
              tickCount={domain.length}
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
              domain={[1, 10.25]}
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
                tickLabels: { fontSize, fontFamily, fill: fontColor }
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
