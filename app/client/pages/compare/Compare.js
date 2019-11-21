import React from 'react';
import { connect } from 'react-redux';

import { ROUTING_PARAMS } from '../../utils/constants';
import compareSelectors from '../../modules/compare/compareSelectors';
import { fetchCompareData, fetchTop5Topics } from '../../modules/compare/compareActions';
import Radar from '../../components/widgets/radar/Radar';
import {
  LEGEND_COLORS,
  LEGEND_COLORS_2,
  PROPS,
  FEATURES,
  CATEGORIES
} from '../../components/widgets/radar/const';
import Button from '../../components/ui-components/Form/Button';
import CompareLine from './CompareLine';
import parseLinesData from './parseLinesData';
import parseCompareTopics from './parseCompareTopics';
import Profile from './Profile';
import Loader from '../../components/ui-components/Layout/Loader';

const { a } = PROPS;

const rem = 16;
const height = a + 2 * 2 * rem; // padding: 2rem

const colorScaleMain = Object.values(LEGEND_COLORS);
const colorScaleCompare = Object.values(LEGEND_COLORS_2);

class Compare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompare: false,
      compareTopics: [],
      linesData: undefined,
      animationFinished: true,
      activeFeature: undefined
    };

    this.toggleCompare = this.toggleCompare.bind(this);
    this.onFeatureActivate = this.onFeatureActivate.bind(this);
    this.onCategoryActivate = this.onCategoryActivate.bind(this);
  }

  componentDidMount() {
    const {
      compareData,
      fetchCompareData,
      location: { search },
      match: {
        params: { type }
      }
    } = this.props;

    const paramsObj = new URLSearchParams(search.slice(1));
    const mainId = paramsObj.get(ROUTING_PARAMS.MAIN_ID);
    const compareId = paramsObj.get(ROUTING_PARAMS.COMPARE_ID);

    if (
      compareData &&
      compareData.main.profile.id === mainId &&
      compareData.compare.profile.id === compareId
    ) {
      this.setState({
        linesData: parseLinesData(compareData)
      });
    } else {
      fetchCompareData({
        type,
        mainId,
        compareId
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { compareData, compareTopics: nCompareTopics } = nextProps;
    const { compareTopics: pCompareTopics } = this.props;
    const { linesData } = this.state;

    if (!linesData && compareData) {
      this.setState({
        linesData: parseLinesData(compareData)
      });
    }

    if (pCompareTopics !== nCompareTopics) {
      this.setState({
        compareTopics: parseCompareTopics(nCompareTopics)
      });
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 0);
    }
  }

  onFeatureActivate(activeFeature) {
    this.setState({ activeFeature });

    if (activeFeature) {
      const criteriaId = FEATURES.NAME_ID[activeFeature.name];
      const {
        fetchTop5Topics,
        location: { search },
        match: {
          params: { type }
        }
      } = this.props;

      const paramsObj = new URLSearchParams(search.slice(1));
      const mainId = paramsObj.get(ROUTING_PARAMS.MAIN_ID);
      const compareId = paramsObj.get(ROUTING_PARAMS.COMPARE_ID);

      fetchTop5Topics({ type, criteriaId, mainId, compareId });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onCategoryActivate(activeCategory) {
    console.log('activeCategory', activeCategory);

    if (activeCategory) {
      const id = CATEGORIES.NAME_ID[activeCategory.name];
      console.log('category id', id);
    }
  }

  toggleCompare() {
    const finishAnimation = () => {
      setTimeout(() => {
        this.setState({ animationFinished: true });
      }, 3000);
    };

    this.setState(
      (state) => ({
        isCompare: !state.isCompare,
        animationFinished: false
      }),
      finishAnimation
    );
  }

  render() {
    const { isCompare, animationFinished, linesData, compareTopics, activeFeature } = this.state;
    const { compareData, history } = this.props;

    console.log('activeFeature', activeFeature);

    if (!linesData) {
      return (
        <div className="d-flex h-100">
          <Loader />
        </div>
      );
    }

    const { main, compare } = compareData;

    return (
      <div className="compare">
        <div className="content-header with-back-btn">
          <button className="go-back" onClick={history.goBack}>
            <span className="arrow" />
            Back
          </button>
          <h1>
            Comparison of {main.profile.name} & {compare.profile.name}
          </h1>
        </div>
        <div className="compare-line d-flex jc-center">
          <Profile {...main.profile} />
          <hr />
          <Profile {...compare.profile} />
        </div>
        <div className="compare-line">
          <div className="title">
            <h1>cTRU radar</h1>
            <div className="d-flex">
              <div className="indicator flex-center">
                <div className="d-flex">
                  <span style={{ background: LEGEND_COLORS.IMPORTANCE }} />
                  <span style={{ background: LEGEND_COLORS_2.IMPORTANCE }} />
                </div>
                <p>Importance</p>
              </div>
              <div className="indicator flex-center">
                <div className="d-flex">
                  <span style={{ background: LEGEND_COLORS.SATISFACTION }} />
                  <span style={{ background: LEGEND_COLORS_2.SATISFACTION }} />
                </div>
                <p>Satisfaction</p>
              </div>
            </div>
            <Button disabled={!animationFinished} onClick={this.toggleCompare}>
              {isCompare ? 'Separate' : 'Compare'}
            </Button>
          </div>
          <div
            style={{ height }}
            className={`radars-wrapper d-flex jc-center p-relative ${isCompare ? 'overlay' : ''}`}
          >
            <Radar
              withDetails={false}
              activeFeature={activeFeature}
              onFeatureActivate={this.onFeatureActivate}
              onCategoryActivate={this.onCategoryActivate}
              colorScale={colorScaleMain}
              withBgIcons={false}
              {...main.radar}
            />
            <hr />
            <Radar
              withDetails={false}
              activeFeature={activeFeature}
              onFeatureActivate={this.onFeatureActivate}
              onCategoryActivate={this.onCategoryActivate}
              colorScale={colorScaleCompare}
              withBgIcons={false}
              {...compare.radar}
            />
            {isCompare && animationFinished && (
              <Radar
                withDetails={false}
                activeFeature={activeFeature}
                onFeatureActivate={this.onFeatureActivate}
                onCategoryActivate={this.onCategoryActivate}
                colorScale={[...colorScaleMain, ...colorScaleCompare]}
                data={{ grades: [...main.radar.data.grades, ...compare.radar.data.grades] }}
              />
            )}
          </div>
        </div>
        <div className="compare-line compare-scale-wrapper">
          {linesData.map((datum) => (
            <CompareLine key={datum.title} {...datum} />
          ))}
          {compareTopics.map((datum) => (
            <CompareLine key={datum.title} {...datum} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  compareData: compareSelectors.compareData(state),
  compareTopics: compareSelectors.compareTopics(state)
});

export default connect(
  mapStateToProps,
  { fetchCompareData, fetchTop5Topics }
)(Compare);
