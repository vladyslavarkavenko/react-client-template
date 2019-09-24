import React from 'react';

export default function SubjectProgress(topics) {
  console.log(topics);
  return (
    <>
      <div className="subject-count">7 of 25</div>
      <div className="subject-progress-bar">
        <div className="fill-bar" style={{ width: '30%' }} />
      </div>
    </>
  );
}
