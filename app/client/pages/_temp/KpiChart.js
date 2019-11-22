import React from 'react';
/* eslint-disable */

import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryArea
} from 'victory';

import { LINE_TYPES } from '../../modules/dashboard/helpers/constants';
import { InlineSvgLoader } from '../../components/ui-components/Layout/Loader';

import defaultConfig from './config';
import LineGradient from '../../components/ui-components/LineGradient';
import KpiChartLegend from './KpiChartLegend';

const { NPS, SATISFACTION, CTRU, PARTICIPATION } = LINE_TYPES;

const gradientKey = (key) => `${key}_gradient`;

function GradientList({ lineColors }) {
  const keys = Object.keys(LINE_TYPES);
  return (
    <svg style={{ height: 0, position: 'absolute' }}>
      <defs>
        {keys.map((key) => (
          <LineGradient key={gradientKey(key)} name={gradientKey(key)} color={lineColors[key]} />
        ))}
      </defs>
    </svg>
  );
}

export default class KpiChart extends React.Component {
  static formatTicks(tick) {
    const tickDate = new Date(tick);

    return tickDate.toLocaleString('en-US', { month: 'short' });
  }

  static additionalAxisParams(lines, tickCount = 10) {
    if (lines[NPS] || lines[SATISFACTION] || lines[PARTICIPATION]) {
      // [-100, 100] -> factor = 200 -> step = 200 / 10 = 20;
      // [0, 100] -> factor = 100 -> step = 100 / 10 = 10;
      const domain = lines[NPS] ? [-100, 100] : [0, 100];
      const factor = Math.abs(domain[0]) + Math.abs(domain[1]); // Absolute size
      const step = factor / tickCount; // for domain scaling

      const formatTicks = (tick) => domain[0] + tick * step;

      const normalizeData = (data) =>
        data.map(({ y, ...rest }) => {
          const normalized = (y + Math.abs(domain[0])) / step;

          return {
            ...rest,
            y: normalized
          };
        });

      return { formatTicks, normalizeData };
    }

    return null;
  }

  render() {
    const {
      dataMap,

      toggleLine,
      visibleLines,
      domain,
      status,
      minDate,
      maxDate,
      config = defaultConfig
    } = this.props;

    const {
      canvasX,
      canvasY,
      tickValues,
      fontColor,
      gridColor,
      fontFamily,
      fontSize,
      lineColors,
      interpolation
    } = config;

    const additionalAxis = KpiChart.additionalAxisParams(visibleLines);

    console.log('_____________________');

    return (
      <div className="rate-chart">
        <KpiChartLegend
          minDate={minDate}
          maxDate={maxDate}
          visibleLines={visibleLines}
          toggleLine={toggleLine}
        />
        <div className="rate-chart__wrapper">
          {status === 'request' && (
            <div className="screen-loader">
              <InlineSvgLoader />
            </div>
          )}

          <GradientList lineColors={lineColors} />
          <VictoryChart width={canvasX} height={canvasY} padding={35}>
            <VictoryAxis
              scale="linear"
              standalone={false}
              domain={domain}
              tickValues={domain}
              tickFormat={KpiChart.formatTicks}
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
              standalone={false}
              tickLabelComponent={<VictoryLabel dx={-10} textAnchor="middle" />}
              tickValues={tickValues}
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

            {additionalAxis && (
              <VictoryAxis
                dependentAxis
                standalone={false}
                tickLabelComponent={<VictoryLabel dx={-10} textAnchor="end" />}
                tickValues={tickValues}
                tickFormat={additionalAxis.formatTicks}
                offsetX={canvasX + 20}
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
            )}

            <VictoryGroup>
              {Object.keys(visibleLines)
                .filter((key) => visibleLines[key])
                .map((key) => {
                  const normalized = additionalAxis
                    ? additionalAxis.normalizeData(dataMap[key])
                    : dataMap[key];
                  return (
                    <VictoryArea
                      style={{
                        data: {
                          stroke: lineColors[key],
                          fill: `url(#${gradientKey(key)})`,
                          strokeWidth: 2
                        },
                        parent: { border: '1px solid #ccc' }
                      }}
                      key={`${key}_area`}
                      interpolation={interpolation}
                      data={normalized}
                    />
                  );
                })}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}
