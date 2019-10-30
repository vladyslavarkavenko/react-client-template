import React from 'react';

export default function TopicItem({ topic }) {
  if (topic) {
    return (
      <li className="section-products__item item item-product">
        <span className="title">{topic.name}</span>
        <span className="score">{topic.ctruScore ? topic.ctruScore.toFixed(1) : '0.0'}</span>
      </li>
    );
  }

  return <li className="section-products__item item item-product" />;
}
