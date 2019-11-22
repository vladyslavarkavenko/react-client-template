import React from 'react';
import { format } from 'date-fns';

/* eslint-disable */
import config from './config';
import { LINE_TYPES } from '../../modules/dashboard/helpers/constants';

const { lineColors, fontColor } = config;

const titleMap = {
  [LINE_TYPES.CTRU]: 'cTru Score',
  [LINE_TYPES.SATISFACTION]: 'Satisfaction',
  [LINE_TYPES.PARTICIPATION]: 'Participation Share',
  [LINE_TYPES.NPS]: 'Net Promote Score'
};

export default function KpiChartLegend({ minDate, maxDate, visibleLines, toggleLine }) {
  const start = format(new Date(minDate), 'MMM dd, yyyy');
  const end = format(new Date(maxDate), 'MMM dd, yyyy');

  const lines = [];

  for (const key in visibleLines) {
    const isActive = visibleLines[key];

    const elem = (
      <div
        className={`line ${isActive ? 'active' : ''}`}
        key={`legend_${key}`}
        onClick={() => toggleLine(key)}
      >
        <span
          className="thumb solid"
          style={{ backgroundColor: isActive ? lineColors[key] : fontColor }}
        />
        {titleMap[key]}
      </div>
    );

    lines.push(elem);
  }

  return (
    <div className="rate-chart__legend">
      <div className="legend__lines">{lines}</div>

      <div className="legend__interval">
        <span className="date">{start}</span>
        <span className="spacer">-</span>
        <span className="date">{end}</span>
      </div>
    </div>
  );
}
