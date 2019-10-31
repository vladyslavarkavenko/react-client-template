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
import ReactSVG from 'react-svg';

import Details from './Details';
import Tooltip from './Tooltip';
import FeaturesLabels from './FeaturesLabels';

import styles from './styles';
import CategoriesLabels from './CategoriesLabels';
import { LEGEND_COLORS, FEATURES, CATEGORIES, PROPS } from './const';

import '../../../assets/styles/pages/overview.less';
// import routing from '../../../utils/routing';

const { a, p, domain, factor, tooltipTriggerRadius, emptyData } = PROPS;
const { ICONS } = CATEGORIES;

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
    const { getRadarScores, data } = this.props;

    data && getRadarScores && data.isInitial && getRadarScores();
  }

  activateFeature(name) {
    const { NAMES, COLORS } = FEATURES;

    const data = Object.values(NAMES).map((x) => {
      const y = x === name ? domain.y[1] : 0;

      return { x, y };
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

      return { x, y };
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
    console.log('points', points);
    if (!points.length || points[0].y === null) {
      return;
    }

    const { eventKey, childName, x, y, _stack: line } = points[0];
    const tooltipData = {
      line,
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
    const { mainAxis, dependentAxis, lines, dots, container } = styles;

    const {
      colorScale = Object.values(LEGEND_COLORS),
      detailsData,
      onFeatureActivate,
      onCategoryActivate,
      withBgIcons = true,
      data: { grades, categoriesDetails, featuresDetails } = emptyData
    } = this.props;
    const { activeFeature, activeCategory, tooltipData } = this.state;

    return (
      <>
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
                {grades.map((d, i) => (
                  <VictoryLine key={i} data={d} name="lines" />
                ))}
              </VictoryGroup>
              <VictoryGroup colorScale={colorScale} style={dots}>
                {grades.map((d, i) => (
                  <VictoryScatter key={i} data={d} name={i === 0 ? 'importance' : 'satisfaction'} />
                ))}
              </VictoryGroup>
              {activeFeature && <VictoryBar {...activeFeature} />}
              {activeCategory && <VictoryBar {...activeCategory} />}
            </VictoryChart>
            <FeaturesLabels onClick={onFeatureActivate || this.activateFeature} />
            <CategoriesLabels onClick={onCategoryActivate || this.activateCategory} />
            <Details
              feature={activeFeature}
              category={activeCategory}
              detailsData={detailsData}
              featuresDetails={featuresDetails}
              categoriesDetails={categoriesDetails}
            />
            <Tooltip colorScale={colorScale} data={grades} tooltipData={tooltipData} />
          </div>
        </div>
        {withBgIcons && (
          <div className="icons-wrapper">
            {Object.values(ICONS).map((src, i) => (
              <ReactSVG className={`bg-icon bg-icon-${i}`} src={src} />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Radar;
