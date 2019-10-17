import React from 'react';
import Point from './Point';

const factor = 100 / 9;

export default function RateItem({ min, max, median, customerRate }) {
  const progressLeft = (min - 1) * factor;
  const progressWidth = (10 - max) * factor;

  return (
    <li className="main-item">
      <div
        className="progress-bar"
        style={{
          marginLeft: `${progressLeft}%`,
          marginRight: `${progressWidth}%`
        }}
      />

      <Point className="point-median" position={(median - 1) * factor} />
      {customerRate && <Point className="point-my" position={(customerRate - 1) * factor} />}
    </li>
  );
}
