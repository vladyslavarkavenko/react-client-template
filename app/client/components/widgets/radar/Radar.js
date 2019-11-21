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
import { InlineSvgLoader } from '../../ui-components/Layout/Loader';
import CategoriesLabels from './CategoriesLabels';
import { LEGEND_COLORS, FEATURES, CATEGORIES, PROPS } from './const';

const { a, p, domain, factor, tooltipTriggerRadius, emptyData } = PROPS;
const { ICONS } = CATEGORIES;

class Radar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFeature: null,
      activeCategory: null
    };

    this.radar = React.createRef();
    this.radarWrapper = React.createRef();

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.activateFeature = this.activateFeature.bind(this);
    this.activateCategory = this.activateCategory.bind(this);
    this.handelClickOutside = this.handelClickOutside.bind(this);
  }

  componentDidMount() {
    const { getRadarScores, data } = this.props;

    data && getRadarScores && data.isInitial && getRadarScores();
    window.addEventListener('click', this.handelClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    const { activeFeature: currentActiveFeature } = this.props;
    const { activeFeature: nextActiveFeature } = nextProps;

    if (currentActiveFeature !== nextActiveFeature) {
      this.setState({
        activeCategory: null,
        activeFeature: nextActiveFeature
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handelClickOutside);
  }

  handelClickOutside(e) {
    const { onFeatureActivate, onCategoryActivate } = this.props;

    if (!this.radar.current.contains(e.target) && this.radarWrapper.current.contains(e.target)) {
      this.setState({
        activeFeature: null,
        activeCategory: null
      });

      if (onFeatureActivate) {
        onFeatureActivate(null);
      }

      if (onCategoryActivate) {
        onCategoryActivate(null);
      }
    }
  }

  activateFeature(name) {
    const { NAMES, COLORS } = FEATURES;
    const { onFeatureActivate } = this.props;

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

    if (onFeatureActivate) {
      onFeatureActivate(activeFeature);
    }
    return this.setState({
      activeFeature,
      activeCategory: null
    });
  }

  activateCategory(name) {
    const { NAMES } = FEATURES;
    const { FEATURES: C_FEATURES, COLORS } = CATEGORIES;
    const { onCategoryActivate } = this.props;

    if (onCategoryActivate) {
      return onCategoryActivate(onCategoryActivate);
    }

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

    return this.setState({
      activeCategory,
      activeFeature: null
    });
  }

  showTooltip(points) {
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
      withBgIcons = true,
      status,
      data: { grades, categoriesDetails, featuresDetails } = emptyData,
      withDetails = true
    } = this.props;
    const { activeFeature, activeCategory, tooltipData } = this.state;

    return (
      <>
        {withBgIcons && (
          <div className="radar-icons-wrapper">
            {Object.values(ICONS).map((src, i) => (
              <ReactSVG key={src} className={`bg-icon bg-icon-${i}`} src={src} />
            ))}
          </div>
        )}
        <div className="radar-wrapper" ref={this.radarWrapper}>
          {status === 'request' && (
            <div className="screen-loader">
              <InlineSvgLoader />
            </div>
          )}
          <div className="radar p-relative" ref={this.radar}>
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
                  voronoiBlacklist={['line']}
                  radius={tooltipTriggerRadius}
                  onActivated={this.showTooltip}
                  onDeactivated={this.hideTooltip}
                />
              }
            >
              <VictoryPolarAxis style={mainAxis} />
              {features.map(({ x }, i) => (
                <VictoryPolarAxis
                  dependentAxis
                  key={`${x}_${i}_axis`}
                  axisValue={x}
                  tickCount={domain.y[1]}
                  style={dependentAxis}
                />
              ))}
              <VictoryGroup colorScale={colorScale} style={dots}>
                {grades.map((d, i) => {
                  const name = i === 0 ? 'importance' : 'satisfaction';
                  return <VictoryScatter key={name + i} data={d} name={name} />;
                })}
              </VictoryGroup>
              <VictoryGroup style={lines}>
                {grades.map((data, index) =>
                  data
                    .filter(({ y }) => y)
                    .map((d, i, arr) => (
                      <VictoryLine
                        key={`${i}_${p}_${d}_line`}
                        name="line"
                        style={{ data: { stroke: colorScale[index] } }}
                        data={[d, arr[i + 1 === arr.length ? 0 : i + 1]]}
                      />
                    ))
                )}
              </VictoryGroup>
              {activeFeature && <VictoryBar {...activeFeature} />}
              {activeCategory && <VictoryBar {...activeCategory} />}
            </VictoryChart>
            <FeaturesLabels onClick={this.activateFeature} />
            <CategoriesLabels onClick={this.activateCategory} />
            {withDetails && (
              <Details
                feature={activeFeature}
                category={activeCategory}
                detailsData={detailsData}
                featuresDetails={featuresDetails}
                categoriesDetails={categoriesDetails}
              />
            )}
            <Tooltip colorScale={colorScale} data={grades} tooltipData={tooltipData} />
          </div>
        </div>
      </>
    );
  }
}

export default Radar;
