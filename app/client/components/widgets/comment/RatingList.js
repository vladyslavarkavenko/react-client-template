import React from 'react';

export default function RatingList({ opinions, id }) {
  const list = opinions.map((opinion, index) => (
    <li key={`${opinion.topic.id}_${id}_r`} className={`rate-opinion theme-${(index % 6) + 1}`}>
      {opinion.topic.name}
      <span className="score">{opinion.opinionCtruScore.toFixed(1)}</span>
    </li>
  ));

  return <ul className="comment__rate-list">{list}</ul>;
}
