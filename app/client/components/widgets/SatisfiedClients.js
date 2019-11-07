import React from 'react';
import { VictoryBar } from 'victory';

import { minMaxRandom } from '../../utils/helpers';

function generateData({ satisfaction, avgSatisfaction }) {
  const data = [];
  let min = 2;
  let max = 10;

  if (satisfaction) {
    switch (satisfaction) {
      case 1:
        min = 2;
        max = 5;

        break;
      case 2:
        min = 3;
        max = 8;
        break;
      case 3:
        min = 8;
        max = 10;
        break;
      default:
        min = 3;
        max = 8;
    }
  } else {
    if (avgSatisfaction >= 75) {
      min = 8;
      max = 10;
    }
    if (avgSatisfaction < 75 && avgSatisfaction >= 50) {
      min = 3;
      max = 8;
    }
    if (avgSatisfaction < 50) {
      min = 2;
      max = 5;
    }
  }

  for (let x = 0; x < 7; x += 1) {
    data.push({ x, y: minMaxRandom(min, max) });
  }

  return data;
}

function getSatisfactionText({ satisfaction, avgSatisfaction }) {
  if (!satisfaction) {
    return avgSatisfaction ? `${avgSatisfaction}%` : '-';
  }

  switch (satisfaction) {
    case 1:
      return 'Unsatisfied';
    case 2:
      return 'Neutral';
    case 3:
      return 'Satisfied';
    default:
      return 'Neutral';
  }
}

export default function SatisfiedClients({ avgSatisfaction, satisfaction }) {
  return (
    <div className="d-flex satisfied-clients">
      <h2 className="percent">{getSatisfactionText({ satisfaction, avgSatisfaction })}</h2>
      <div className="chart-group">
        <p className="chart-group__text">{satisfaction ? 'Overall level' : ' Satisfied clients'}</p>
        <div className="chart-group__bar">
          <VictoryBar
            data={generateData({ satisfaction, avgSatisfaction })}
            domain={{ x: [0, 6], y: [1, 10] }}
            width={80}
            height={15}
            cornerRadius={1.5}
            barWidth={10}
            padding={{ top: 0, bottom: 0, right: 5, left: 5 }}
            style={{
              data: { fill: 'white' },
              parent: {
                display: 'flex',
                alignItems: 'flex-end'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
