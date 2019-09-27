import React from 'react';

export default function SubjectProgress({ topics }) {
  const filledCount = topics.reduce((acc, topic) => (topic.dateLastOpinion ? acc + 1 : acc), 0);
  const totalCount = topics.length;

  const percentage = Math.round((filledCount && filledCount / totalCount) * 100);

  return (
    <>
      <div className="subject-count">{`${filledCount} of ${totalCount}`}</div>
      <div className="subject-progress-bar">
        <div className="fill-bar" style={{ width: `${percentage}%` }} />
      </div>
    </>
  );
}
