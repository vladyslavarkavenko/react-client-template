import React from 'react';

import PROPS from './chartProperties';
import { getCoordByPoint } from './utils';

const { padding: p } = PROPS;

const Indicator = ({ activePoint }) => {
  if (!Object.keys(activePoint).length) {
    return null;
  }

  const { importance, satisfaction } = activePoint;
  const { top, right } = getCoordByPoint(activePoint);

  return (
    <div
      className="custom-indicator p-absolute"
      style={{
        top,
        right,
        left: p,
        bottom: p
      }}
    >
      <div className="circle lt">{importance}</div>
      <div className="circle rb">{satisfaction}</div>
      <div className="circle rt big" />
      <div className="circle rt medium" />
      <div className="circle rt small" />
    </div>
  );
};

export default Indicator;
