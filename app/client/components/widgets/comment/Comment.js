import React from 'react';
import { format } from 'date-fns';

import Rating from './Rating';

export default function Comment({ data: { rate, id, author, date, text } }) {
  const formattedDate = format(new Date(date), 'MMM d, yyyy');

  return (
    <li className="comment__item">
      <div className="comment__title">
        <span className="author">{author}</span>
        <span className="date">{formattedDate}</span>
      </div>
      <Rating rate={rate} id={id} />
      <div className="comment__body">{text}</div>
    </li>
  );
}
