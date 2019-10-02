/* eslint-disable */
import React from 'react';
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryPolarAxis,
  VictoryBar,
  VictoryScatter,
  VictoryVoronoiContainer
} from 'victory';

import '../../assets/styles/pages/overview.less';

const a = 500; // width & height
const factor = 0.2; // For categories bars that overflow chart
const p = (a / 2) * factor;
const domain = { y: [0, 10] };

const COLORS = {
  IMPORTANCE: '#0075B7',
  SATISFACTION: '#33BCDB'
};

const FEATURES = {
  CLEAR: 'Clear',
  CREATIVE: 'Creative',
  CONVENIENT: 'Convenient',
  CARING: 'Caring',
  COURTEGIOUS: 'Courtegious',
  CONFIDENT: 'Confident',
  COMPENSATING: 'Compensating',
  COST_CONSCIOUS: 'Cost conscious'
};

const {
  CLEAR,
  CARING,
  CREATIVE,
  CONFIDENT,
  CONVENIENT,
  COURTEGIOUS,
  COMPENSATING,
  COST_CONSCIOUS
} = FEATURES;

const SECTOR_COLORS = {
  [CLEAR]: '#EF6363',
  [CARING]: '#69BE60',
  [CREATIVE]: '#F07E68',
  [CONFIDENT]: '#4CB1E9',
  [CONVENIENT]: '#FFAF5F',
  [COURTEGIOUS]: '#13BE99',
  [COMPENSATING]: '#8E97F1',
  [COST_CONSCIOUS]: '#B96E9F'
};

const CATEGORIES = {
  RATIONAL: 'Rational',
  PROCESS: 'Process',
  FEELING: 'Feeling',
  RESULT: 'Result'
};

const { RESULT, FEELING, PROCESS, RATIONAL } = CATEGORIES;

const CATEGORIES_FEATURE = {
  [RESULT]: [CONFIDENT, COMPENSATING, COST_CONSCIOUS],
  [FEELING]: [CARING, COURTEGIOUS, CONFIDENT],
  [PROCESS]: [CARING, CONVENIENT, CREATIVE],
  [RATIONAL]: [CREATIVE, CLEAR, COST_CONSCIOUS]
};

const CATEGORIES_COLORS = {
  [RESULT]: '#B96CE3',
  [FEELING]: '#5EBB6B',
  [PROCESS]: '#FACF55',
  [RATIONAL]: '#F57575'
};

const realData = {
  category: [{ x: 0, y: 0 }]
};
// The order is important!!!
const data = [
  [
    // importance
    {
      x: FEATURES.CLEAR,
      y: 2
    },
    {
      x: FEATURES.CREATIVE,
      y: 5
    },
    {
      x: FEATURES.CONVENIENT,
      y: 4
    },
    {
      x: FEATURES.CARING,
      y: 8
    },
    {
      x: FEATURES.COURTEGIOUS,
      y: 5
    },
    {
      x: FEATURES.CONFIDENT,
      y: 2
    },
    {
      x: FEATURES.COMPENSATING,
      y: 7
    },
    {
      x: FEATURES.COST_CONSCIOUS,
      y: 9
    }
  ],
  [
    // satisfaction
    {
      x: FEATURES.CLEAR,
      y: 3
    },
    {
      x: FEATURES.CREATIVE,
      y: 10
    },
    {
      x: FEATURES.CONVENIENT,
      y: 6
    },
    {
      x: FEATURES.CARING,
      y: 3
    },
    {
      x: FEATURES.COURTEGIOUS,
      y: 6
    },
    {
      x: FEATURES.CONFIDENT,
      y: 9
    },
    {
      x: FEATURES.COMPENSATING,
      y: 8
    },
    {
      x: FEATURES.COST_CONSCIOUS,
      y: 10
    }
  ]
];

const styles = {
  lines: {
    data: {
      fillOpacity: 0.2,
      strokeWidth: 2
    }
  },
  dots: {
    data: {
      strokeWidth: 1,
      stroke: 'white'
    }
  },
  dependentAxis: {
    axisLabel: { padding: 10, cursor: 'pointer' },
    axis: { stroke: 'none' },
    grid: {
      stroke: 'grey',
      strokeWidth: 0.25,
      opacity: 0.5
    },
    tickLabels: { fill: 'none' }
  },
  mainAxis: {
    axis: { stroke: 'none ' },
    grid: {
      stroke: 'grey',
      opacity: 0.5
    },
    tickLabels: { fill: 'none' }
  }
};

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      activeSector: null,
      activeCategory: null
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.activateSector = this.activateSector.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
  }

  activateSector(value) {
    const features = Object.values(FEATURES);
    const data = features.map((x) => ({
      x,
      y: x === value ? domain.y[1] : 0
    }));

    const activeSector = {
      data,
      style: {
        data: {
          fill: SECTOR_COLORS[value],
          fillOpacity: 0.2,
          strokeWidth: 2,
          pointerEvents: 'none'
        },
        labels: { fill: 'none' }
      }
    };

    this.setState({
      activeSector,
      activeCategory: null
    });
  }

  activateCategory(value) {
    const data = Object.values(FEATURES).map((x) => ({
      x,
      y: CATEGORIES_FEATURE[value].indexOf(x) !== -1 ? domain.y[1] * (1 + factor) : 0
    }));

    const activeCategory = {
      data,
      style: {
        data: {
          fill: CATEGORIES_COLORS[value],
          fillOpacity: 0.4,
          pointerEvents: 'none'
        },
        labels: { fill: 'none' }
      }
    };

    this.setState({
      activeCategory,
      activeSector: null
    });
  }

  showTooltip(points) {
    console.log('points', points);
  }

  hideTooltip(points) {
    console.log('points', points);
  }

  render() {
    const { data, activeSector, activeCategory } = this.state;

    return (
      <div className="content-body">
        <div className="radar">
          <VictoryChart
            polar
            domain={domain}
            width={a}
            height={a}
            padding={p}
            containerComponent={
              <VictoryVoronoiContainer
                responsive={false}
                onActivated={this.showTooltip}
                onDeactivated={this.hideTooltip}
                voronoiBlacklist={['lines']}
              />
            }
          >
            <VictoryPolarAxis style={styles.mainAxis} />
            {Object.values(FEATURES).map((value) => (
              <VictoryPolarAxis
                dependentAxis
                key={value}
                label={value}
                axisValue={value}
                labelPlacement="perpendicular"
                style={styles.dependentAxis}
                events={[
                  {
                    target: 'axisLabel',
                    eventHandlers: { onClick: () => this.activateSector(value) }
                  }
                ]}
              />
            ))}
            <VictoryGroup colorScale={Object.values(COLORS)} style={styles.lines}>
              {data.map((data, i) => (
                <VictoryLine key={i} data={data} name="lines" />
              ))}
            </VictoryGroup>
            <VictoryGroup colorScale={Object.values(COLORS)} style={styles.dots}>
              {data.map((data, i) => (
                <VictoryScatter
                  key={i}
                  data={data}
                  name={i === 0 ? 'importance' : 'satisfaction'}
                />
              ))}
            </VictoryGroup>
            {activeSector && <VictoryBar {...activeSector} />}
            {activeCategory && <VictoryBar {...activeCategory} />}
          </VictoryChart>
          {Object.values(CATEGORIES).map((value, i) => (
            <button
              className={`category category-${i}`}
              key={value}
              onClick={() => this.activateCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Overview;
