import React from 'react';

const factor = 100 / 9;

export default function RateItem({ ctruScore, selected, topics, staffId }) {
  const mainWidth = (10 - ctruScore) * factor;

  const progressList = selected.map(({ id }) => {
    const topic = topics.find((topic) => topic.id === id) || { ctruScore: 0 };

    const progressWidth = (10 - (topic.ctruScore || 1.15)) * factor;

    return (
      <div className="main-item" key={`${staffId}_${id}_progress`}>
        <div
          className="progress-bar"
          style={{
            marginLeft: '0%',
            marginRight: `${progressWidth || 98}%`
          }}
        >
          <span className={`label ${progressWidth <= 5 ? 'left' : 'right'}`}>
            {topic.ctruScore.toFixed(1)}
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
            <span className={`label ${mainWidth <= 5 ? 'left' : 'right'}`}>
              {ctruScore.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </li>
  );
}
