import React from 'react';
import { format } from 'date-fns';

import { LINE_TYPES } from '../../../../modules/opinionDetails/helpers/constants';

export default function RateChartLegend({ minDate, maxDate, visibleLines }) {
  const start = format(new Date(minDate), 'MMM dd, yyyy');
  const end = format(new Date(maxDate), 'MMM dd, yyyy');
  return (
    <div className="rate-chart__legend">
      <div className="legend__lines">
        {visibleLines.includes(LINE_TYPES.SATISFACTION) && (
          <div className="line">
            <span className="thumb solid" />
            Satisfaction
          </div>
        )}
        {visibleLines.includes(LINE_TYPES.IMPORTANCE) && (
          <div className="line">
            <span className="thumb dashed" />
            Importance
          </div>
        )}
      </div>

      <div className="legend__interval">
        <span className="date">{start}</span>
        <span className="spacer">-</span>
        <span className="date">{end}</span>
      </div>
    </div>
  );
}
