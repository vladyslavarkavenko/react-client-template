import React from 'react';
import RatingDots from './RatingDots';

export default function Skeleton({ selectedTopicId, index }) {
  return (
    <li className="comment__item skeleton">
      <div className="comment__title">
        <span className="author" />
        <span className="date" />
      </div>

      {selectedTopicId ? (
        <RatingDots rate={10} id={index} />
      ) : (
        <ul className="comment__rate-list">
          <li className="rate-opinion" />
          <li className="rate-opinion" />
          <li className="rate-opinion" />
        </ul>
      )}

      <div className="comment__body" />
    </li>
  );
}
