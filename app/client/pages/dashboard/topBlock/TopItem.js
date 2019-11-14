import React from 'react';

export default function TopItem({ data, scoreFormat, diff, noCtruScore }) {
  const { ctruScore, name: topicName, keyValue, subject } = data;
  const { name: subjectName } = subject;

  return (
    <li className="top-widget__item">
      <div className="title">
        <span className="subject">{subjectName}</span>
        <span className="topic">
          {topicName}

          {!noCtruScore && <span className="score">({ctruScore.toFixed(1)})</span>}
        </span>
      </div>

      <span className="value">
        <span className="count">
          {typeof scoreFormat === 'function' ? scoreFormat(keyValue) : keyValue}
        </span>

        {diff > 0 && <span className="diff-tooltip green">+{diff}%</span>}

        {diff < 0 && <span className="diff-tooltip red">{diff}%</span>}
      </span>
    </li>
  );
}
