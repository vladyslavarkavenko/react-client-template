/* eslint-disable */
import React from 'react';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryAxis } from 'victory';
import { connect } from 'react-redux';

import { COLORS } from '../../utils/constants';
import lightenDarkenColor from '../../utils/helpers';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';

const config = {
  canvasX: 1000,
  canvasY: 500,

  padding: 0,

  baseColor: '#3ea0da'
};

function RateChart() {
  const { padding, canvasX, canvasY } = config;

  return (
    <div className="rate-chart">
      <div className="rate-chart__wrapper">
        <VictoryChart
          width={canvasX}
          height={canvasY}
          domain={{
            x: [0, 12],
            y: [0, 10]
          }}
        >
          {/*<VictoryAxis*/}
          {/*  domain={[1, 12]}*/}
          {/*  style={{*/}
          {/*    labels: {*/}
          {/*      fontSize: 12*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  standalone={false}*/}
          {/*/>*/}
          {/*<VictoryAxis dependentAxis domain={[0, 10]} standalone={false} />*/}
          <VictoryGroup>
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              interpolation="natural"
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 }
              ]}
            />
            <VictoryLine
              interpolation="natural"
              style={{
                data: { stroke: '#4c5ec4' },
                parent: { border: '1px solid #ccc' }
              }}
              data={[
                { x: 1, y: 4 },
                { x: 2, y: 2 },
                { x: 3, y: 2 },
                { x: 4, y: 6 },
                { x: 5, y: 7 }
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: opinionDetailsSelectors.selectedCriteria(state)
});

export default connect(mapStateToProps)(RateChart);
