import React from 'react';
import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryScatter,
  VictoryPolarAxis,
  VictoryVoronoiContainer
} from 'victory';

import Details from './radar/Details';
import Tooltip from './radar/Tooltip';
import FeaturesLabels from './radar/FeaturesLabels';

import styles from './radar/styles';
import CategoriesLabels from './radar/CategoriesLabels';
import { LEGEND_COLORS, FEATURES, CATEGORIES, PROPS } from './const';

import '../../../assets/styles/pages/overview.less';

const { a, p, domain, factor, tooltipTriggerRadius, emptyData } = PROPS;

class Radar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFeature: null,
      activeCategory: null
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.activateFeature = this.activateFeature.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
  }

  componentDidMount() {
    const { getRadarScores } = this.props;

    getRadarScores && getRadarScores();
  }

  activateFeature(name) {
    const { NAMES, COLORS } = FEATURES;

    const data = Object.values(NAMES).map((x) => {
      const y = x === name ? domain.y[1] : 0;

      return {
        x,
        y
      };
    });

    const style = styles.activateFeature(COLORS[name]);
    const activeFeature = {
      name,
      data,
      style
    };

    this.setState({
      activeFeature,
      activeCategory: null
    });
  }

  activateCategory(name) {
    const { NAMES } = FEATURES;
    const { FEATURES: C_FEATURES, COLORS } = CATEGORIES;

    const data = Object.values(NAMES).map((x) => {
      const y = C_FEATURES[name].indexOf(x) !== -1 ? domain.y[1] * (1.2 + factor) : 0;

      return {
        x,
        y
      };
    });

    const style = styles.activeCategory(COLORS[name]);
    const activeCategory = {
      name,
      data,
      style
    };

    this.setState({
      activeCategory,
      activeFeature: null
    });
  }

  showTooltip(points) {
    if (!points.length || points[0].y === null) {
      return;
    }

    const { eventKey, childName, x, y } = points[0];
    const tooltipData = {
      eventKey,
      childName,
      x,
      y
    };

    this.setState({ tooltipData });
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
    const features = Object.values(FEATURES.NAMES);
    const colorScale = Object.values(LEGEND_COLORS);
    const { mainAxis, dependentAxis, lines, dots, container } = styles;

    const { data = emptyData } = this.props;
    const { activeFeature, activeCategory, tooltipData } = this.state;

    return (
      <div className="radar-wrapper">
        <div className="radar p-relative">
          <VictoryChart
            polar
            domain={domain}
            width={a}
            height={a}
            padding={p}
            containerComponent={
              <VictoryVoronoiContainer
                style={container}
                responsive={false}
                voronoiBlacklist={['lines']}
                radius={tooltipTriggerRadius}
                onActivated={this.showTooltip}
                onDeactivated={this.hideTooltip}
              />
            }
          >
            <VictoryPolarAxis style={mainAxis} />
            {features.map((value) => (
              <VictoryPolarAxis
                key={value}
                dependentAxis
                axisValue={value}
                tickCount={domain.y[1]}
                style={dependentAxis}
              />
            ))}
            <VictoryGroup colorScale={colorScale} style={lines}>
              {data.map((d, i) => (
                <VictoryLine key={i} data={d} name="lines" />
              ))}
            </VictoryGroup>
            <VictoryGroup colorScale={colorScale} style={dots}>
              {data.map((d, i) => (
                <VictoryScatter key={i} data={d} name={i === 0 ? 'importance' : 'satisfaction'} />
              ))}
            </VictoryGroup>
            {activeFeature && <VictoryBar {...activeFeature} />}
            {activeCategory && <VictoryBar {...activeCategory} />}
          </VictoryChart>
          <FeaturesLabels onClick={this.activateFeature} />
          <CategoriesLabels onClick={this.activateCategory} />
          <Details feature={activeFeature} category={activeCategory} />
          <Tooltip data={data} tooltipData={tooltipData} />
        </div>
      </div>
    );
  }
}

export default Radar;
