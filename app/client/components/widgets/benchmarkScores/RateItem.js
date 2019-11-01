import React from 'react';

const factor = 100 / 9;

export default function RateItem({ ctruScore, selected, topics, staffId }) {
  const mainWidth = (10 - ctruScore) * factor;

  const progressList = selected.map(({ id }) => {
    const topic = topics.find((topic) => topic.id === id) || { ctruScore: 0 };

    const { ctruScore } = topic;

    const progressWidth = (10 - ctruScore) * factor;

    return (
      <div className="main-item" key={`${staffId}_${id}_progress`}>
        <div
          className="progress-bar"
          style={{
            marginLeft: '0%',
            marginRight: `${progressWidth || 98}%`
          }}
        >
          <span
            className={`
              label withColor
              ${progressWidth <= 5 ? 'left' : 'right'}
            `}
            style={ctruScore === 0 ? { left: '0.25rem' } : {}}
          >
            {topic.ctruScore === 0 ? 'None' : topic.ctruScore.toFixed(1)}
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
