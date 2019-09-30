import React from 'react';
import i18next from 'i18next';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { VictoryScatter, VictoryChart, VictoryVoronoiContainer, VictoryAxis } from 'victory';

import Tooltip from './chart/Tooltip';
import Indicator from './chart/Indicator';
import AxisLabels from './chart/AxisLabels';
import { calculateBgColor } from './chart/utils';
import OpinionAboutBlock from './OpinionAboutBlock';
import PROPS, { allPoints } from './chart/chartProperties';
import { axisStyle, bubbleStyle, activeBubbleStyle } from './chart/styles';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import { pushRateTopic, fetchTopicOpinions } from '../../modules/shareOpinion/shareOpinionActions';

import '../../assets/styles/pages/chart.less';

const {
  width: w,
  ticks: t,
  height: h,
  padding: p,
  maxBubbleSize,
  minBubbleSize,
  activeBubbleSize,
  tooltipTriggerRadius
} = PROPS;

const initialState = {
  x: undefined,
  y: undefined,
  activePoint: {},
  showOpinions: false,
  tooltipData: null
};
const tickFormat = () => '';

class ShareOpinionChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };

    this.chartWrapper = React.createRef();

    this.updateBG = this.updateBG.bind(this);
    this.onActivated = this.onActivated.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.saveOpinion = this.saveOpinion.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  onActivated(points) {
    const { satisfaction, importance } = points[0];

    const activePoint = { importance, satisfaction };
    this.setState({ activePoint });
  }

  onMouseMove(e) {
    const { currentTarget, pageX, pageY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    const x = pageX - left;
    const y = pageY - top;

    this.setState({ x, y }, () => {
      window.requestAnimationFrame(this.updateBG);
    });
  }

  onNextClick() {
    const { activePoint } = this.state;
    const { pushRateTopic } = this.props;

    pushRateTopic(activePoint);
    this.setState({ ...initialState });
  }

  saveOpinion() {
    const { fetchTopicOpinions } = this.props;

    fetchTopicOpinions();
    this.setState({ showOpinions: true });
  }

  updateBG() {
    const { x, y } = this.state;

    this.chartWrapper.current.style.backgroundColor = calculateBgColor(x, y);
  }

  showTooltip(points) {
    if (points.length) {
      const { satisfaction, importance, quantity, eventKey } = points[0];

      const tooltipData = {
        eventKey,
        quantity,
        importance,
        satisfaction
      };
      this.setState({ tooltipData });
    }
  }

  hideTooltip(points) {
    const { tooltipData } = this.state;

    if (tooltipData && points.length && tooltipData.eventKey === points[0].eventKey) {
      this.setState({ tooltipData: null });
    }
  }

  render() {
    const { opinions } = this.props;
    const { activePoint, showOpinions, tooltipData } = this.state;

    const { satisfaction: s, importance: i } = activePoint;

    const rateText = `${i18next.t('shareOpinion.i')} ${i} & ${i18next.t('shareOpinion.s')} ${s}`;

    return (
      <div ref={this.chartWrapper} className="chart-wrapper content">
        <OpinionAboutBlock backgroundColor="transparent" />
        <div
          style={{ width: w, height: h }}
          className="p-relative cursor-pointer"
          onMouseMove={showOpinions ? null : this.onMouseMove}
        >
          <AxisLabels />
          <Tooltip data={tooltipData} />
          <Indicator activePoint={activePoint} />
          {showOpinions ? (
            <>
              <div className="info-msg">
                <h1 className="uppercase">{i18next.t('shareOpinion.rate')}</h1>
                <ReactSVG className="emoji" src={`/assets/svg/emoji/${s}_${i}.svg`} />
                <h3>{rateText}</h3>
                <button onClick={this.onNextClick}>{i18next.t('shareOpinion.next')}</button>
              </div>

              <VictoryChart
                width={w}
                height={h}
                padding={p}
                domain={[0, t]}
                containerComponent={
                  <VictoryVoronoiContainer
                    responsive={false}
                    radius={tooltipTriggerRadius}
                    onActivated={this.showTooltip}
                    onDeactivated={this.hideTooltip}
                    voronoiBlacklist={['active-tooltip']}
                  />
                }
              >
                <VictoryAxis style={axisStyle} tickFormat={tickFormat} offsetY={p} />
                <VictoryAxis style={axisStyle} tickFormat={tickFormat} offsetX={p} dependentAxis />
                <VictoryScatter
                  y="importance"
                  x="satisfaction"
                  data={opinions}
                  style={bubbleStyle}
                  bubbleProperty="quantity"
                  maxBubbleSize={maxBubbleSize}
                  minBubbleSize={minBubbleSize}
                />
                {tooltipData && (
                  <VictoryScatter
                    y="importance"
                    x="satisfaction"
                    data={[tooltipData]}
                    name="active-tooltip"
                    size={activeBubbleSize}
                    style={activeBubbleStyle}
                  />
                )}
              </VictoryChart>
            </>
          ) : (
            <VictoryChart
              width={w}
              height={h}
              padding={p}
              domain={[0, t]}
              containerComponent={
                <VictoryVoronoiContainer
                  responsive={false}
                  onActivated={this.onActivated}
                  events={{ onClick: this.saveOpinion }}
                />
              }
            >
              <VictoryAxis style={axisStyle} tickFormat={tickFormat} offsetY={p} />
              <VictoryAxis style={axisStyle} tickFormat={tickFormat} offsetX={p} dependentAxis />
              <VictoryScatter
                y="importance"
                x="satisfaction"
                data={allPoints}
                style={{ data: { fill: 'transparent' } }}
              />
            </VictoryChart>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ opinions: shareOpinionSelectors.topicOpinions(state) });

export default connect(
  mapStateToProps,
  { pushRateTopic, fetchTopicOpinions }
)(ShareOpinionChart);
