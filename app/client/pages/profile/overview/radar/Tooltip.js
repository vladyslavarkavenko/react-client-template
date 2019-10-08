import React from 'react';

import { FEATURES, PROPS, LEGEND_COLORS } from '../const';
import calculatePositionByAngle from './helpers/calculatePositionByAngle';

const { NAMES } = FEATURES;
const { domain, a, p } = PROPS;
const { SATISFACTION, IMPORTANCE } = LEGEND_COLORS;

const Tooltip = ({ data, tooltipData }) => {
  if (!tooltipData || !data) return null;

  const features = Object.values(NAMES);
  const { x, y, childName } = tooltipData;

  // Calculate position
  const point = {
    x: a / 2 + (y / domain.y[1]) * (a / 2 - p),
    y: a / 2
  };
  const angle = features.indexOf(x) * (360 / features.length) * (Math.PI / 180);

  const { top, left } = calculatePositionByAngle(angle, point);

  // Calculate values
  let importance;
  let satisfaction;

  if (childName === 'satisfaction') {
    satisfaction = y;
    importance = data[0].find((item) => item.x === x).y;
  } else {
    importance = y;
    satisfaction = data[1].find((item) => item.x === x).y;
  }

  return (
    <div
      className="radar-tooltip"
      style={{
        top: top - 10,
        left: left + 10
      }}
    >
      <h5>{x}</h5>
      <div className="info-line">
        <span className="dot" style={{ background: SATISFACTION }} />
        <p>Satisfaction</p>
        <h6>{Math.round(satisfaction * 10) / 10}</h6>
      </div>
      <div className="info-line">
        <span className="dot" style={{ background: IMPORTANCE }} />
        <p>Importance</p>
        <h6>{Math.round(importance * 10) / 10}</h6>
      </div>
    </div>
  );
};

export default Tooltip;
