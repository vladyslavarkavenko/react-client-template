import React from 'react';

import CircleWithBackground from './CircleWithBackground';

const config = {
  size: 300,
  padding: 0,
  innerRadius: 300 / 2 - 30,
  cornerRadius: 25,

  backgroundColor: '#F7F8FA',
  color: '#3EA0DA'
};

export default function ParticipationCircle({ data = {}, profileLabel = '' }) {
  const { numberUniqueCustomerOpinions: opinionsCount, numberCustomers: customerCount } = data;

  const { size } = config;

  const percent = Math.round((customerCount - opinionsCount) / customerCount) * 100;

  return (
    <div className="participation">
      <div className="participation__chart">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <CircleWithBackground percent={percent} circle={config} config={config} />
        </svg>

        <div className="participation__label">
          <span className="count">{opinionsCount}</span>
          <span className="text">Reviews</span>
        </div>
      </div>
      <span className="participation__info">
        % of {profileLabel} clients that shared their opinion
      </span>
    </div>
  );
}
