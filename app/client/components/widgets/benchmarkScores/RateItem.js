import React from 'react';

const factor = 100 / 9;

export default function RateItem({ score }) {
  const progressWidth = (10 - score) * factor;

  return (
    <li className="main-item">
      <div
        className="progress-bar"
        style={{
          marginLeft: '0%',
          marginRight: `${progressWidth}%`
        }}
      >
        <span className={`label ${progressWidth <= 5 ? 'left' : 'right'}`}>{score.toFixed(1)}</span>
      </div>
    </li>
  );
}
