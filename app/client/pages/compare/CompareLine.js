import React from 'react';

const CompareLine = ({ domain, values, withPercent, title }) => {
  const ld = Math.floor((values[0] - values[1]) * 10) / 10; // left difference
  const rd = Math.floor((values[1] - values[0]) * 10) / 10; // right difference
  domain = domain || Math.max(...values);

  return (
    <div className="compare-scale">
      <h1>{title}</h1>
      <div className="flex-center w-100">
        <p>
          {`${values[0]}${withPercent ? '%' : ''}`}
          {ld > 0 ? <span>+{ld}</span> : ''}
        </p>
        <div className="legend">
          <div
            className="left"
            style={{
              width: `calc(${values[0] / domain} * 50%)`,
              background: ld > 0 ? '#3EA0DA' : '#6F91BA'
            }}
          />
          <div className="separator" />
          <div
            className="right"
            style={{
              width: `calc(${values[1] / domain} * 50%)`,
              background: rd > 0 ? '#3EA0DA' : '#6F91BA'
            }}
          />
        </div>
        <p>
          {`${values[1]}${withPercent ? '%' : ''}`}
          {rd > 0 ? <span>+{rd}</span> : ''}
        </p>
      </div>
    </div>
  );
};

export default CompareLine;
