import React from 'react';
import Point from './topScores/Point';

export default function TopScoresHeader() {
  return (
    <div className="top-scores title">
      <h2 className="title-label info-block__title">Top Scores</h2>
      <div className="title-legend">
        <div className="title-legend__item">
          <span className="range-dot" />
          <span>Range</span>
        </div>
        <div className="title-legend__item">
          <Point className="point-median" />
          <span>Median</span>
        </div>
        <div className="title-legend__item">
          <Point className="point-my" />
          <span>My rating</span>
        </div>
      </div>
    </div>
  );
}
