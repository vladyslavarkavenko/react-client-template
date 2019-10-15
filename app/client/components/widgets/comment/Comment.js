import React from 'react';

import Rating from './Rating';

export default function Comment({ rate, id }) {
  return (
    <li className="comment__item">
      <div className="comment__title">
        <span className="author">Nickname</span>
        <span className="date">Jan 30, 2019</span>
      </div>
      <Rating rate={rate} id={id} />
      <div className="comment__body">
        I was always afraid of investing money other than in my savings account. Mr. Meier took over
        2 hours to explain the investment strategy funds to me and what a difference such an
        investment makes for retirement provision
      </div>
    </li>
  );
}
