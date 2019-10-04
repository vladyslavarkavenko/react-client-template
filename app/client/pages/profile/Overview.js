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
  [CLEAR]: [
    {
      importance: 2,
      satisfaction: 6
    },
    {
      importance: 10,
      satisfaction: 3
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 2,
      satisfaction: 3
    }
  ],
  [CREATIVE]: [
    {
      importance: 2,
      satisfaction: 6
    },
    {
      importance: 10,
      satisfaction: 3
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 2,
      satisfaction: 3
    }
  ],
  [CONVENIENT]: [
    {
      importance: 2,
      satisfaction: 6
    },
    {
      importance: 7,
      satisfaction: 3
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 9,
      satisfaction: 3
    }
  ],
  [CARING]: [
    {
      importance: 2,
      satisfaction: 6
    },
    {
      importance: 4,
      satisfaction: 8
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 2,
      satisfaction: 3
    }
  ],
  [COURTEGIOUS]: [
    {
      importance: 2,
      satisfaction: 6
    },
    {
      importance: 7,
      satisfaction: 3
    },
    {
      importance: 10,
      satisfaction: 2
    },
    {
      importance: 2,
      satisfaction: 3
    }
  ],
  [CONFIDENT]: [
    {
      importance: 2,
      satisfaction: 6
    },
    {
      importance: 7,
      satisfaction: 2
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 2,
      satisfaction: 3
    }
  ],
  [COMPENSATING]: [
    {
      importance: 2,
      satisfaction: 3
    },
    {
      importance: 4,
      satisfaction: 5
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 2,
      satisfaction: 3
    }
  ],
  [COST_CONSCIOUS]: [
    {
      importance: 6,
      satisfaction: 6
    },
    {
      importance: 2,
      satisfaction: 9
    },
    {
      importance: 10,
      satisfaction: 8
    },
    {
      importance: 2,
      satisfaction: 8
    }
  ]
};

function parseData(realData) {
  const data = [
    [], // Importance
    [] //  Satisfaction
  ];

  Object.keys(realData).forEach((feature) => {
    const opinions = realData[feature];

    let i = 0;
    let s = 0;

    opinions.forEach(({ importance, satisfaction }) => {
      i += importance;
      s += satisfaction;
    });

    data[0].push({
      x: feature,
      y: i / opinions.length
    });
    data[1].push({
      x: feature,
      y: s / opinions.length
    });
  });

  console.log('data', data);
  return data;
}

const styles = {
  lines: {
    data: {
      fillOpacity: 0.2,
      strokeWidth: 2,
      pointerEvents: 'none'
    }
  },
  dots: {
    data: {
      strokeWidth: 1,
      stroke: 'white',
      pointerEvents: 'none'
    }
  },
  dependentAxis: {
    axisLabel: {
      padding: 10,
      cursor: 'pointer'
    },
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
      opacity: 0.4
    },
    tickLabels: { fill: 'none' }
  }
};

const Tooltip = ({ data, tooltipData }) => {
  const { x, y, childName } = tooltipData;
  const features = Object.values(FEATURES);

  // Calculate position
  const center = {
    x: a / 2,
    y: a / 2
  };
  const point = {
    x: a / 2 + (y / domain.y[1]) * (a / 2 - p),
    y: a / 2
  };

  const angle = features.indexOf(x) * (360 / features.length) * (Math.PI / 180);
  const s = Math.sin(angle);
  const c = Math.cos(angle);

  const realX = c * (point.x - center.x) - s * (point.y - center.y) + center.x;
  const realY = s * (point.x - center.x) + c * (point.y - center.y) + center.y;

  // Calculate values
  let importance, satisfaction;

  if (childName === 'satisfaction') {
    satisfaction = y;
    importance = data[0].find((item) => item.x === x).y;
  } else {
    importance = y;
    satisfaction = data[1].find((item) => item.x === x).y;
  }

  return (
    <div className="radar-tooltip" style={{ top: a - realY - 10, left: realX + 10 }}>
      <h5>{x}</h5>
      <div className="info-line">
        <span className="dot" style={{ backgroundColor: COLORS.SATISFACTION }} />
        <p>Satisfaction</p>
        <h6>{Math.round(satisfaction * 10) / 10}</h6>
      </div>
      <div className="info-line">
        <span className="dot" style={{ backgroundColor: COLORS.IMPORTANCE }} />
        <p>Importance</p>
        <h6>{Math.round(importance * 10) / 10}</h6>
      </div>
    </div>
  );
};

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: parseData(realData),
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
    if (points.length) {
      const { eventKey, childName, x, y } = points[0];

      const tooltipData = { eventKey, childName, x, y };

      this.setState({ tooltipData });
    }
  }

  hideTooltip(points) {
    // To change state only when showTooltip has already finished executing.
    setTimeout(() => {
      const { tooltipData } = this.state;

      if (
        tooltipData &&
        points.length &&
        points[0].eventKey === tooltipData.eventKey &&
        points[0].childName === tooltipData.childName
      ) {
        this.setState({ tooltipData: null });
      }
    }, 0);
  }

  render() {
    const { data, activeSector, activeCategory, tooltipData } = this.state;

    return (
      <div className="content-body">
        <div className="radar p-relative">
          {tooltipData && <Tooltip data={data} tooltipData={tooltipData} />}
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
                radius={20}
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
