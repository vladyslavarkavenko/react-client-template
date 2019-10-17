import React from 'react';

import CircleWithBackground from './CircleWithBackground';
import ArrowSvg from '../../../../public/assets/svg/sort-up.solid.svg';

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

export default function CtruScoreCircle({ profileLabel, reviewsCount, isDouble }) {
  const { size } = config;

  return (
    <div className="ctru-circle">
      <div className="ctru-circle__chart">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <CircleWithBackground circle={circleOuter} percent={75} config={config} />

          {isDouble && <CircleWithBackground circle={circleInner} percent={60} config={config} />}
        </svg>

        <div className="ctru-circle__label">
          <span className="count">7.6</span>
          <span className="diff green">
            +12.2% <ArrowSvg />
          </span>

          {/*<span className="diff red">*/}
          {/*  +12.2% <ArrowSvg />*/}
          {/*</span>*/}
        </div>
      </div>

      {isDouble && (
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
      )}

      <span className="ctru-circle__info">Based on {reviewsCount} reviews</span>
    </div>
  );
}
