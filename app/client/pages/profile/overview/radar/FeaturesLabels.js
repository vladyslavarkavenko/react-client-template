import React from 'react';

import Icon from './Icon';

import { FEATURES } from '../const';
import calculatePositionByAngle from './helpers/calculatePositionByAngle';

// TODO: Rewrite using formula.
const rem = 16;
const marginMap = {
  0: { l: rem, t: 0 },
  45: { l: rem / 1.5, t: -rem / 1.5 },
  90: { l: 0, t: -rem },
  135: { l: -rem / 1.5, t: -rem / 1.5 },
  180: { l: -rem, t: 0 },
  225: { l: -rem / 1.5, t: rem / 1.5 },
  270: { l: 0, t: rem },
  315: { l: rem / 1.5, t: rem / 1.5 }
};

const features = Object.values(FEATURES.NAMES);

const FeaturesLabels = ({ onClick }) => {
  return (
    <>
      {features.map((name, i, arr) => {
        const angle = i * (360 / arr.length);

        const textRotate = (i < 5 ? 90 : 270) - angle;
        const { top, left } = calculatePositionByAngle(angle * (Math.PI / 180));

        return (
          <div key={name}>
            <div
              onClick={() => onClick(name)}
              className="p-absolute label"
              style={{
                top: top + marginMap[angle].t,
                left: left + marginMap[angle].l,
                transform: `translate(-50%, -50%) rotate(${textRotate}deg)`
              }}
            >
              <p>{name}</p>
            </div>
            <Icon
              name={name}
              onClick={() => onClick(name)}
              style={{
                top: top + marginMap[angle].t * 3,
                left: left + marginMap[angle].l * 3
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default FeaturesLabels;
