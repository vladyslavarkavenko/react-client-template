import React from 'react';
import { VictoryPie } from 'victory';

const config = {
  size: 300,
  padding: 0,
  innerRadius: 300 / 2 - 30,
  cornerRadius: 25,

  backgroundColor: '#F7F8FA',
  color: '#3EA0DA'
};

export default function ParticipationCircle({ data, profileLabel = '' }) {
  const { numberUniqueCustomerOpinions: opinionsCount, numberCustomers: customerCount } = data;

  const { size, innerRadius, cornerRadius, padding, color, backgroundColor } = config;

  const percent = Math.round((customerCount - opinionsCount) / customerCount) * 100;

  const points = [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];

  return (
    <div className="participation">
      <div className="participation__chart">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <VictoryPie
            standalone={false}
            width={size}
            height={size}
            data={[{ x: 1, y: 100 }]}
            innerRadius={innerRadius}
            cornerRadius={0}
            padding={padding}
            labels={() => null}
            style={{
              data: {
                fill: backgroundColor
              }
            }}
          />
          <VictoryPie
            standalone={false}
            width={size}
            height={size}
            data={points}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            padding={padding}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  return datum.x === 1 ? color : 'transparent';
                }
              }
            }}
          />
        </svg>

        <div className="participation__label">
          <span className="count">{opinionsCount}</span>
          <span className="text">Reviews</span>
        </div>
      </div>
      <span className="participation__info">
        % of {profileLabel} clients that shared their opinion
      </span>
    </div>
  );
}
