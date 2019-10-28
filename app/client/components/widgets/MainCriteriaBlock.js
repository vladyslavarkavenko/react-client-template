import React from 'react';

import ProgressBar from '../ui-components/ProgressBar';

const mockData = [
  { id: 2, name: 'Convenient', percentage: 90 },
  { id: 1, name: 'Creative', percentage: 75 },
  { id: 4, name: 'Clear', percentage: 70 },
  { id: 6, name: 'Compensating', percentage: 55 }
];

export default function MainCriteriaBlock({ criteria = mockData }) {
  const list = criteria
    .sort((a, b) => b.percentage - a.percentage)
    .map(({ id, name, percentage }) => (
      <li key={`${id}_m_crit_w`} className={`widget-main-criteria__item theme-${id}`}>
        <span className="label">{name}</span>
        <ProgressBar percentage={percentage} />
      </li>
    ));

  return <ul className="widget-main-criteria__list">{list}</ul>;
}
