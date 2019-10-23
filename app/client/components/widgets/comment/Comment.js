import React from 'react';
import { format } from 'date-fns';

import RatingDots from './RatingDots';
import RatingList from './RatingList';

export default function Comment({
  data: { id, fullName, dateComment, text, opinions },
  selectedTopicId
}) {
  const formattedDate = format(new Date(dateComment), 'MMM d, yyyy');

  const selectedTopic =
    selectedTopicId && opinions.find((item) => item.topic.id === selectedTopicId);

  return (
    <li className="comment__item">
      <div className="comment__title">
        <span className="author">{fullName}</span>
        <span className="date">{formattedDate}</span>
      </div>

      {selectedTopicId ? (
        <RatingDots rate={selectedTopic.opinionCtruScore} id={id} />
      ) : (
        <RatingList opinions={opinions} id={id} />
      )}

      <div className="comment__body">{text}</div>
    </li>
  );
}
