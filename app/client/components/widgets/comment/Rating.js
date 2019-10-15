import React from 'react';

export default function Rating({ rate, id }) {
  const round = Math.round(rate);

  const empty = Array(10 - round).fill(null);
  const filled = Array(round).fill(null);

  return (
    <div className="comment__rate">
      <span className="count">{rate.toFixed(1)}</span>
      <ul className="progress">
        {filled.map((item, index) => (
          <li key={`${id}_${index}_f`} className="dot fill" />
        ))}
        {empty.map((item, index) => (
          <li key={`${id}_${index}_e`} className="dot empty" />
        ))}
      </ul>
    </div>
  );
}
