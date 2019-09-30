/* eslint-disable */
import React from 'react';
import ReactSVG from 'react-svg';
import {
  VictoryScatter,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryTooltip,
  Flyout
} from 'victory';

import '../../assets/styles/pages/chart.less';
import { pushRateTopic, fetchTopicOpinions } from '../../modules/shareOpinion/shareOpinionActions';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';

import StarSvg from '../../../../public/assets/svg/star.svg';
import SmileSvg from '../../../../public/assets/svg/smile.svg';

const ticks = 10;
const padding = 50;
const height = 600;
const width = 1500;

const maxBubbleSize = 70;
const minBubbleSize = 10;
const activeBubbleSize = minBubbleSize - 5;

const allPoints = [];
for (let i = 1; i <= ticks; i += 1) {
  for (let s = 1; s <= ticks; s += 1) {
    allPoints.push({
      importance: i,
      satisfaction: s
    });
  }
}

const colors = {
  lt: {
    r: 255,
    g: 0,
    b: 0
  }, //    left-top
  rt: {
    r: 255,
    g: 153,
    b: 0
  }, //  right-top
  rb: {
    r: 51,
    g: 204,
    b: 51
  }, //  right-bottom
  lb: {
    r: 51,
    g: 51,
    b: 255
  } //   left-bottom
};

const axisStyle = {
  axis: {
    stroke: 'white',
    strokeWidth: 0.5
  },
  axisLabel: {
    fontSize: 16,
    fill: 'white',
    fontFamily: "'Muli', sans-serif"
  }
};

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

function getCoordByPoint({ importance: i, satisfaction: s }) {
  const top = ((ticks - i) * (height - 2 * padding)) / ticks + padding;
  const right = ((ticks - s) * (width - 2 * padding)) / ticks + padding;

  return {
    top,
    right,
    left: width - right,
    bottom: height - top
  };
}

const initialState = {
  x: undefined,
  y: undefined,
  activePoint: {},
  showOpinions: false,
  tooltipData: null
};

class ShareOpinionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };

    this.chartWrapper = React.createRef();

    this.updateBG = this.updateBG.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onActivated = this.onActivated.bind(this);
    this.saveOpinion = this.saveOpinion.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip(points) {
    if (!points.length) {
      return;
    }
    const { satisfaction, importance, quantity, eventKey } = points[0];

    console.log('here1');
    this.setState({
      tooltipData: {
        satisfaction,
        importance,
        quantity,
        eventKey
      }
    });
  }

  hideTooltip(points) {
    const { tooltipData } = this.state;

    if (tooltipData && points.length && tooltipData.eventKey === points[0].eventKey) {
      console.log('here2');
      this.setState({
        tooltipData: null
      });
    }
  }

  onActivated(points) {
    const { satisfaction, importance } = points[0];

    this.setState({
      activePoint: {
        satisfaction,
        importance
      }
    });
  }

  onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top; // To reverse y-axis

    this.setState({ x, y }, () => {
      window.requestAnimationFrame(this.updateBG);
    });
  }

  updateBG() {
    let { x, y } = this.state;
    const chartWrapper = this.chartWrapper.current;

    // Reverse y-axis
    y = height - y;

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
    const { fetchTopicOpinions } = this.props;

    fetchTopicOpinions();
    this.setState({
      showOpinions: true
    });
  }

  onNextClick() {
    const { activePoint } = this.state;
    const { pushRateTopic } = this.props;

    pushRateTopic(activePoint);
    this.setState({ ...initialState });
  }

  render() {
    const { opinions } = this.props;
    const { activePoint, showOpinions, tooltipData } = this.state;

    console.log('tooltipData', tooltipData);

    const Indicator = () => {
      if (!Object.keys(activePoint).length) return null;

      const { importance, satisfaction } = activePoint;
      const { top, right } = getCoordByPoint(activePoint);

      return (
        <div
          className="custom-indicator p-absolute"
          style={{
            bottom: padding,
            left: padding,
            top,
            right
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

    const Tooltip = ({ data }) => {
      console.log('data', data);
      if (!data) return null;

      const { importance, satisfaction, quantity } = data;
      const { top, left } = getCoordByPoint(data);

      return (
        <div
          className="p-absolute tooltip"
          style={{
            top: top - 5,
            left: left + 15
          }}
        >
          <h6>{quantity} opinions</h6>
          <p>Importance {importance}</p>
          <p>Satisfaction {satisfaction}</p>
        </div>
      );
    };

    const CustomLabelX = () => {
      return (
        <div className="label p-absolute" style={{ top: height - padding / 2, left: width / 2 }}>
          <SmileSvg />
          Satisfaction
        </div>
      );
    };

    const CustomLabelY = () => {
      return (
        <div className="label label-y p-absolute" style={{ top: height / 2, left: padding / 2 }}>
          <StarSvg />
          Importance
        </div>
      );
    };

    return (
      <div className="chart-wrapper" ref={this.chartWrapper}>
        <div
          className="p-relative cursor-pointer"
          width={width}
          height={height}
          onMouseMove={showOpinions ? null : this.onMouseMove}
        >
          <Indicator />
          <Tooltip data={tooltipData} />
          <CustomLabelX />
          <CustomLabelY />
          {showOpinions ? (
            <>
              <VictoryChart
                width={width}
                height={height}
                padding={padding}
                domain={[0, ticks]}
                containerComponent={
                  <VictoryVoronoiContainer
                    radius={50}
                    responsive={false}
                    onActivated={this.showTooltip}
                    onDeactivated={this.hideTooltip}
                    voronoiBlacklist={['active-tooltip']}
                  />
                }
              >
                <VictoryAxis tickFormat={() => ''} offsetY={padding} style={axisStyle} />
                <VictoryAxis
                  style={axisStyle}
                  dependentAxis
                  tickFormat={() => ''}
                  offsetX={padding}
                />
                <VictoryScatter
                  style={{ data: { fill: 'rgba(255, 255, 255, .5)' } }}
                  bubbleProperty="quantity"
                  y="importance"
                  x="satisfaction"
                  data={opinions}
                  maxBubbleSize={maxBubbleSize}
                  minBubbleSize={minBubbleSize}
                />
                {tooltipData && (
                  <VictoryScatter
                    name="active-tooltip"
                    data={[tooltipData]}
                    y="importance"
                    x="satisfaction"
                    size={activeBubbleSize}
                    style={{
                      data: { fill: 'white' }
                    }}
                  />
                )}
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
                <button onClick={this.onNextClick}>Next</button>
              </div>
            </>
          ) : (
            <VictoryChart
              width={width}
              height={height}
              padding={padding}
              domain={[0, ticks]}
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
              <VictoryAxis tickFormat={() => ''} offsetY={padding} style={axisStyle} />
              <VictoryAxis
                dependentAxis
                tickFormat={() => ''}
                offsetX={padding}
                style={axisStyle}
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
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  opinions: shareOpinionSelectors.topicOpinions(state)
});

const mapDispatchToProps = {
  pushRateTopic,
  fetchTopicOpinions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareOpinionChart);
