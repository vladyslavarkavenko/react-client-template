import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import { connect } from 'react-redux';

import { setSatisfactionValue } from '../../modules/kpiSettings/kpiSettingsActions';
import OptionWrapper from './OptionWrapper';
import kpiSettingsSelectors from '../../modules/kpiSettings/kpiSettingsSelectors';

class SatisfactionOption extends React.Component {
  static handleFormat(value) {
    if (Number.isNaN(value)) {
      return '-%';
    }

    return `${value.toFixed()}%`;
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
    const { initialValue, currentValue, realValue, setValue } = this.props;

    const diffArr = [
      {
        // mark: 'Real',
        title: 'Satisfied Clients',
        value: realValue,
        diff: currentValue - realValue
      }
    ];

    const marks = {};

    diffArr.forEach(({ value }) => {
      marks[value] = '';
    });

    return (
      <OptionWrapper
        title="Satisfied Clients"
        oldValue={initialValue}
        newValue={currentValue}
        diffArr={diffArr}
        handleReset={this.handleReset}
        formatValue={SatisfactionOption.handleFormat}
      >
        <Slider
          min={0}
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
  const { satisfaction: initialValue } = kpiSettingsSelectors.getSettingsTarget(state);
  const { satisfaction = 0 } = kpiSettingsSelectors.getSettingsActual(state);

  const currentValue = kpiSettingsSelectors.getSatisfaction(state);

  return {
    status,
    initialValue,
    currentValue,
    realValue: satisfaction
  };
};

const mapDispatchToProps = {
  setValue: setSatisfactionValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SatisfactionOption);
