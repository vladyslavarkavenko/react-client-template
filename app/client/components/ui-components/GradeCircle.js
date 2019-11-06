import React from 'react';

export default function GradeCircle({ score }) {
  return (
    <div className="grade-circle flex-center">
      <div className="inner-circle flex-center">{score}</div>
    </div>
  );
}
