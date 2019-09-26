import React from 'react';
import ReactSVG from 'react-svg';
import { VictoryScatter, VictoryChart, VictoryVoronoiContainer, VictoryAxis } from 'victory';

import '../assets/styles/pages/chart.less';

const allPoints = [];
for (let i = 1; i <= 10; i += 1) {
  for (let s = 1; s <= 10; s += 1) {
    allPoints.push({ importance: i, satisfaction: s });
  }
}

const data = [
  { importance: 1, satisfaction: 5, opinions: 1 },
  { importance: 2, satisfaction: 7, opinions: 50 },
  { importance: 3, satisfaction: 4, opinions: 75 },
  { importance: 8, satisfaction: 4, opinions: 100 }
];

const colors = {
  lt: { r: 255, g: 0, b: 0 }, //    left-top
  rt: { r: 255, g: 153, b: 0 }, //  right-top
  rb: { r: 51, g: 204, b: 51 }, //  right-bottom
  lb: { r: 51, g: 51, b: 255 } //   left-bottom
};

const axisStyle = {
  axis: { stroke: 'white', strokeWidth: 0.5 },
  axisLabel: {
    fontSize: 16,
    fill: 'white',
    fontFamily: "'Muli', sans-serif"
  }
};

const padding = 50;
const height = 600;
const width = 1500;

const calculateColorParam = (param, x, y, width, height) => {
  const { lt, rt, rb, lb } = colors;

  const ltFactor = lt[param] * (width - x) * y;
  const rtFactor = rt[param] * x * y;
  const rbFactor = rb[param] * x * (height - y);
  const lbFactor = lb[param] * (width - x) * (height - y);

  return Math.round((ltFactor + rtFactor + rbFactor + lbFactor) / (width * height));
};

function calculateColor(x, y, width, height) {
  const r = calculateColorParam('r', x, y, width, height);
  const g = calculateColorParam('g', x, y, width, height);
  const b = calculateColorParam('b', x, y, width, height);

  console.log(r, g, b);
  return `rgb(${r}, ${g}, ${b})`;
}

class ShareOpinionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: undefined,
      y: undefined,
      activePoint: {},
      showOpinions: false
    };

    this.chartWrapper = React.createRef();

    this.updateBG = this.updateBG.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onActivated = this.onActivated.bind(this);
    this.saveOpinion = this.saveOpinion.bind(this);
  }

  onActivated(points) {
    const { satisfaction, importance } = points[0];
    this.setState({ activePoint: { satisfaction, importance } });
  }

  onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = height - (e.pageY - rect.top); // To reverse y-axis

    this.setState({ x, y }, () => {
      window.requestAnimationFrame(this.updateBG);
    });
  }

  updateBG() {
    let { x, y } = this.state;
    const chartWrapper = this.chartWrapper.current;

    // Remove padding
    x -= padding;
    y -= padding;
    const w = width - 2 * padding;
    const h = height - 2 * padding;

    // Adjust final values
    if (x < 0) x = 0;
    if (x > w) x = w;
    if (y < 0) y = 0;
    if (y > h) y = h;

    // Change bg
    chartWrapper.style.backgroundColor = calculateColor(x, y, w, h);
  }

  saveOpinion() {
    // const { activePoint } = this.state;
    // TODO: Save in Redux.
    this.setState({
      showOpinions: true
    });
  }

  render() {
    const { activePoint, showOpinions } = this.state;

    return (
      <div className="chart-wrapper" ref={this.chartWrapper}>
        {showOpinions ? (
          <>
            <VictoryChart
              width={width}
              height={height}
              padding={padding}
              domain={[0, 10]}
              containerComponent={
                <VictoryVoronoiContainer
                  responsive={false}
                  voronoiBlacklist={['activePoint']}
                  labels={({ datum: { importance, satisfaction, opinions } }) =>
                    `Importance: ${importance}\nSatisfaction: ${satisfaction}\nOpinions: ${opinions}`
                  }
                />
              }
            >
              <VictoryAxis
                tickFormat={() => ''}
                offsetY={padding}
                label="Satisfaction"
                style={axisStyle}
              />
              <VictoryAxis
                style={axisStyle}
                dependentAxis
                tickFormat={() => ''}
                offsetX={padding}
                label="Importance"
              />
              <VictoryScatter
                style={{ data: { fill: 'rgba(255, 255, 255, .5)' } }}
                data={data}
                y="importance"
                x="satisfaction"
                bubbleProperty="opinions"
                maxBubbleSize={70}
                minBubbleSize={10}
              />
            </VictoryChart>

            <div className="info-msg">
              <h1 className="uppercase">Your rate</h1>
              <ReactSVG
                className="emoji"
                src={`/assets/svg/emoji/${activePoint.satisfaction}_${activePoint.importance}.svg`}
              />
              <h3>
                Importance {activePoint.importance} & Satisfaction {activePoint.satisfaction}
              </h3>
              <button> Next </button>
            </div>
          </>
        ) : (
          <div width={width} height={height} onMouseMove={this.onMouseMove}>
            <VictoryChart
              width={width}
              height={height}
              padding={padding}
              domain={[0, 10]}
              containerComponent={
                <VictoryVoronoiContainer
                  responsive={false}
                  onActivated={this.onActivated}
                  events={{
                    onClick: this.saveOpinion
                  }}
                />
              }
            >
              <VictoryAxis
                tickFormat={() => ''}
                offsetY={padding}
                label="Satisfaction"
                style={axisStyle}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={() => ''}
                offsetX={padding}
                label="Importance"
                style={axisStyle}
              />
              <VictoryScatter
                name="activePoint"
                data={[activePoint]}
                y="importance"
                x="satisfaction"
                style={{
                  data: { fill: 'white' }
                }}
              />
              <VictoryScatter
                data={allPoints}
                y="importance"
                x="satisfaction"
                style={{
                  data: { fill: 'transparent' }
                }}
              />
            </VictoryChart>
          </div>
        )}
      </div>
    );
  }
}

export default ShareOpinionChart;
