import React from 'react';

import { LEGEND_COLORS } from './const';

const { IMPORTANCE, SATISFACTION } = LEGEND_COLORS;

const RadarTitle = () => (
  <div className="d-flex jc-between ai-center">
    <h2 className="m-0 info-block__title">cTRU Radar</h2>
    <div className="d-flex">
      <div className="indicator flex-center">
        <span style={{ background: IMPORTANCE }} />
        <p>Importance</p>
      </div>
      <div className="indicator flex-center">
        <span style={{ background: SATISFACTION }} />
        <p>Satisfaction</p>
      </div>
    </div>
  </div>
);

export default RadarTitle;
