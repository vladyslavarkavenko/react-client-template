/* eslint-disable */
import React from 'react';
import { VictoryPie } from 'victory';
import { Link } from 'react-router-dom';

import { COLORS } from '../../../utils/constants';
import { lightenDarkenColor } from '../../../utils/helpers';

const config = {
  size: 300,
  padding: 0,

  padAngle: 0.5,
  innerRadius: 70,
  labelRadius: (150 - 70) / 2 + 70 - 5,
  baseColor: '#3ea0da'
};

const generateColors = (total, baseColor) => {
  const factor = total / 10;

  return Array(total)
    .fill(null)
    .map((_, index) => lightenDarkenColor(baseColor, index * ((8 * 1) / factor) - 30 * factor));
};

const generateData = () => {
  const rating = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * (10 - 1) + 1));

  const data = rating.map((item, index) => ({
    x: index + 1,
    y: item
  }));

  return data;
};

const data = generateData();

export default function CtruPieChart({ changeOpinionLink }) {
  const { size, padding, innerRadius, padAngle, labelRadius, baseColor } = config;

  const colors = generateColors(data.length, baseColor);

  return (
    <div className="ctru-pie">
      <div className="ctru-pie__wrapper">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <VictoryPie
            standalone={false}
            width={size}
            height={size}
            data={data}
            innerRadius={innerRadius}
            padding={padding}
            padAngle={padAngle}
            labelRadius={labelRadius}
            colorScale={colors}
            style={{
              labels: {
                fontSize: 14,
                fontWeight: 600,
                fill: 'white'
              }
            }}
          />
        </svg>

        <div className="ctru-pie__label">
          <span className="count">6.8</span>
          <span className="text">Score</span>
        </div>
      </div>

      {changeOpinionLink && (
        <div className="ctru-pie__btns">
          <Link to={changeOpinionLink} className="change-opinion-btn">
            Change your opinion
          </Link>
        </div>
      )}
    </div>
  );
}
