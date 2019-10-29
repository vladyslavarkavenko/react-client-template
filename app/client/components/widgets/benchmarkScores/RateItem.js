import React from 'react';

const factor = 100 / 9;

export default function RateItem({ score, selected }) {
  const mainWidth = (10 - score) * factor;

  const progressList = selected.map((item, i) => {
    const progressWidth = (10 - score) * factor * 0.2 * (i + 1);
    return (
      <div className="main-item">
        <div
          className="progress-bar"
          style={{
            marginLeft: '0%',
            marginRight: `${progressWidth}%`
          }}
        >
          <span className={`label ${progressWidth <= 5 ? 'left' : 'right'}`}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
    );
  });

  return (
    <li className="group">
      {progressList.length ? (
        progressList
      ) : (
        <div className="main-item">
          <div
            className="progress-bar"
            style={{
              marginLeft: '0%',
              marginRight: `${mainWidth}%`
            }}
          >
            <span className={`label ${mainWidth <= 5 ? 'left' : 'right'}`}>{score.toFixed(1)}</span>
          </div>
        </div>
      )}
    </li>
  );
}
