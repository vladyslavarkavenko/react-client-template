import React from 'react';

export default function Legend({ selected }) {
  const topicDots = selected.map((item) => (
    <div className="legend__item" key={`${item.id}_legend`}>
      <span className="legend__dot" />
      <span>{item.name}</span>
    </div>
  ));

  return (
    <div className="benchmark-scores__legend">
      {selected.length !== 0 ? (
        topicDots
      ) : (
        <div className="legend__item">
          <span className="legend__dot" />
          <span>Total score</span>
        </div>
      )}
    </div>
  );
}
