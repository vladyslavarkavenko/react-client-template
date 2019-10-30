import React from 'react';

import TopicItem from './TopicItem';

export default function SubjectRow({ tags, data }) {
  const { name, topics } = data;

  const tagsCols = {};

  tags.forEach((tag) => {
    tagsCols[tag.id] = [];
  });

  topics.forEach((topic) => {
    topic.tags.forEach((tag) => {
      tagsCols[tag.id].push(topic);
    });

    if (!topic.tags.length) {
      tagsCols[1].push(topic);
    }
  });

  const tagList = Object.values(tagsCols);

  const maxLength = tagList.reduce(
    (maxValue, col) => (col.length > maxValue ? col.length : maxValue),
    0
  );

  const rows = Array(maxLength)
    .fill(null)
    .map((_, position) => (
      <ul className="section-products__list" key={`${position}_s`}>
        {tagList.map((tag, index) => {
          const cell = tag[position];

          if (cell) {
            return <TopicItem key={`${position}_${index}_${cell.id}_i`} topic={cell} />;
          }

          return <TopicItem key={`${position}_${index}_e`} />;
        })}
      </ul>
    ));

  return (
    <li className="row">
      <div className="section-subject item item-subject">
        <span className="title">{name}</span>
      </div>
      <div className="section-products">{rows}</div>
    </li>
  );
}
