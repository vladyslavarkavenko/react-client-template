import React from 'react';
import { VictoryPie } from 'victory';

const config = {
  size: 300,
  cornerRadius: 25,
  backgroundColor: '#F7F8FA'
};

const circleOuter = {
  padding: 0,
  innerRadius: 300 / 2 - 30,
  color: '#0075B7'
};

const circleInner = {
  padding: {
    top: 35,
    bottom: 35
  },
  innerRadius: (300 - 35 * 2) / 2 - 30,

  color: '#00BFDF'
};

const CircleWithBackground = ({ circle, percent }) => {
  const { size, cornerRadius, backgroundColor } = config;
  const { innerRadius, padding, color } = circle;
  const data = [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];

  return (
    <>
      <VictoryPie
        standalone={false}
        width={size}
        height={size}
        data={[{ x: 1, y: 100 }]}
        innerRadius={innerRadius}
        cornerRadius={0}
        padding={padding}
        labels={() => null}
        style={{
          data: {
            fill: backgroundColor
          }
        }}
      />
      <VictoryPie
        standalone={false}
        width={size}
        height={size}
        data={data}
        innerRadius={innerRadius}
        cornerRadius={cornerRadius}
        padding={padding}
        labels={() => null}
        style={{
          data: {
            fill: ({ datum }) => {
              return datum.x === 1 ? color : 'transparent';
            }
          }
        }}
      />
    </>
  );
};

export default function CtruScoreCircle({ profileLabel, reviewsCount }) {
  const { size } = config;

  return (
    <div className="ctru-circle">
      <div className="ctru-circle__chart">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <CircleWithBackground circle={circleOuter} percent={75} />
          <CircleWithBackground circle={circleInner} percent={60} />
        </svg>

        <div className="ctru-circle__label">
          <span className="count">7.6</span>
        </div>
      </div>
      <ul className="ctru-circle__legend">
        <li className="legend-item">
          <span className="point outer" />
          <span className="text">All clients</span>
          <span className="score">7.9</span>
        </li>
        <li className="legend-item">
          <span className="point inner" />
          <span className="text">Clients of {profileLabel}</span>
          <span className="score">6.9</span>
        </li>
      </ul>
      <span className="ctru-circle__info">Based on {reviewsCount} reviews</span>
    </div>
  );
}
