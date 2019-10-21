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
import { connect } from 'react-redux';

import { COLORS } from '../../utils/constants';
import { lightenDarkenColor, minMaxRandom } from '../../utils/helpers';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';

const config = {
  canvasX: 1000,
  canvasY: 450,

  padding: 0,

  strokeWidth: 2,
  interpolation: 'natural',

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

const generateData = (min, max) => {
  const data = [];

  for (let i = 0; i <= 11; i++) {
    const date = new Date(2000, i);
    data.push({ x: date, y0: 1, y: minMaxRandom(min, max) });
  }

  console.log(data);
  return data;
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

function RateChart() {
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

  return (
    <div className="rate-chart">
      <div className="rate-chart__wrapper">
        <svg style={{ height: 0 }}>
          <defs>
            <LineGradient name={gradientKey} color={satisfaction.color} />
          </defs>
        </svg>
        <VictoryChart width={canvasX} height={canvasY} scale={{ x: 'time' }} padding={30}>
          <VictoryAxis
            // domain={[1, 12]}
            domain={generateDomain()}
            standalone={false}
            tickFormat={(t) => t.toLocaleString('en-US', { month: 'short' })}
            tickCount={12}
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
              data={generateData(4, 7)}
            />

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
              data={generateData(3, 6)}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: opinionDetailsSelectors.selectedCriteria(state)
});

export default connect(mapStateToProps)(RateChart);
