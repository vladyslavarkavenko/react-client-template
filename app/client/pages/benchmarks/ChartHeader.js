import React from 'react';

import FilterSelectButton from './FilterSelectButton';

export default function ChartHeader() {
  return (
    <div className="bench-chart-header">
      <ul className="chart-tabs__list">
        <li className="chart-tabs__item active">Bankers</li>
        <li className="chart-tabs__item">Departments</li>
        <li className="chart-tabs__item">Branches</li>
      </ul>

      <FilterSelectButton />
    </div>
  );
}
