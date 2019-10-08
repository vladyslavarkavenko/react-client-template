import React from 'react';

import Icon from './Icon';
import Button from '../../components/Button';

import CONST from '../../../../utils/constants';
import calculatePositionByAngle from './helpers/calculatePositionByAngle';

const { BTN_TYPES } = CONST;

// TODO: Rewrite using formula.
const featuresMap = {
  0: [-10, -50],
  45: [-25, -50],
  90: [-50, -90],
  135: [-75, -50],
  180: [-90, -50],
  225: [-75, -50],
  270: [-50, -10],
  315: [-25, -50]
};

const categoriesMap = {
  0: [20, -50],
  90: [-50, -130],
  180: [-120, -50],
  270: [-50, 30]
};

const Details = ({ feature, category }) => {
  if (!feature && !category) {
    return null;
  }

  const { data, name } = feature || category;
  const i = data.findIndex(({ y }) => y > 0);

  let angle;
  let transform;

  if (feature) {
    angle = i * (360 / data.length);
    transform = `translate(${featuresMap[angle][0]}%, ${featuresMap[angle][1]}%)`;
  }
  if (category) {
    angle = i === 0 ? 0 : (i + 1) * (360 / data.length);
    transform = `translate(${categoriesMap[angle][0]}%, ${categoriesMap[angle][1]}%)`;
  }

  const { top, left } = calculatePositionByAngle(angle * (Math.PI / 180));

  return (
    <div
      className="p-absolute details"
      style={{
        top,
        left,
        transform
      }}
    >
      <Icon line name={name} />
      <div className="wrapper">
        <h4>{name}</h4>
        <div className="info-line">
          <p>Entries</p>
          <h6>45</h6>
        </div>
        <div className="info-line">
          <p>Participation share</p>
          <h6>16%</h6>
        </div>
        <Button title="Details" type={BTN_TYPES.BLUE} />
      </div>
    </div>
  );
};

export default Details;
