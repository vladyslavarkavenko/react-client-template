import React from 'react';
import { VictoryPie } from 'victory';

const defaultConfig = {
  size: 300,
  cornerRadius: 25,
  backgroundColor: '#F7F8FA'
};

export default function CircleWithBackground({ circle, percent, config = defaultConfig }) {
  const { size, cornerRadius, backgroundColor } = config;
  const { innerRadius, padding, color } = circle;
  const data = [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];

  return (
    <>
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
        data={data}
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
    </>
  );
}
