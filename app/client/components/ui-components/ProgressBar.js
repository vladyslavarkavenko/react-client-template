import React from 'react';

export default function ProgressBar({ percentage, className = '' }) {
  return (
    <div className={`progress-widget ${className}`}>
      <div className="fill-bar" style={{ width: `${percentage}%` }} />
    </div>
  );
}
