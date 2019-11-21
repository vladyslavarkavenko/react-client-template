import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import { connect } from 'react-redux';

import { setNPSValue } from '../../modules/kpiSettings/kpiSettingsActions';
import OptionWrapper from './OptionWrapper';
import kpiSettingsSelectors from '../../modules/kpiSettings/kpiSettingsSelectors';

class NpsOption extends React.Component {
  static handleFormat(value) {
    if (Number.isNaN(value)) {
      return '-';
    }

    return `${value.toFixed()}`;
  }

  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    const { initialValue, setValue } = this.props;
    setValue(initialValue);
  }

  render() {
    const { initialValue, currentValue, npsRecommendation, npsSatisfaction, setValue } = this.props;

    const diffArr = [
      {
        mark: 'Satisfaction',
        title: 'NPS Satisfaction',
        value: npsSatisfaction,
        diff: currentValue - npsSatisfaction

        // markStyle: { top: '-40px', backgroundColor: 'red' }
      },
      {
        mark: 'Recommendation',
        title: 'NPS Recommendation',
        value: npsRecommendation,
        diff: null
        // diff: currentValue - npsRecommendation
      }
    ];

    const marks = {};

    diffArr.forEach(({ value }) => {
      if (value <= 100 && value >= -100) {
        marks[value] = '';
      }
    });

    return (
      <OptionWrapper
        title="Net Promoter Score"
        oldValue={initialValue}
        newValue={currentValue}
        diffArr={diffArr}
        handleReset={this.handleReset}
        formatValue={NpsOption.handleFormat}
      >
        <Slider
          min={-100}
          max={100}
          step={1}
          marks={marks}
          onChange={setValue}
          value={currentValue}
          className="kpi-slider"
        />
      </OptionWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const status = kpiSettingsSelectors.getSettingsStatus(state);
  const { nps: initialValue } = kpiSettingsSelectors.getSettingsTarget(state);
  const { npsRecommendation = 0, npsSatisfaction = 0 } = kpiSettingsSelectors.getSettingsActual(
    state
  );

  const currentValue = kpiSettingsSelectors.getNPS(state);

  return {
    status,
    initialValue,
    currentValue,
    npsRecommendation,
    npsSatisfaction
  };
};

const mapDispatchToProps = {
  setValue: setNPSValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NpsOption);
