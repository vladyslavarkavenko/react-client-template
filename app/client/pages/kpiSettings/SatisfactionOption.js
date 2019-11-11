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
    const { currentValue, initialValue, setValue } = this.props;

    return (
      <OptionWrapper
        title="Satisfied Clients"
        oldValue={initialValue}
        newValue={currentValue}
        handleReset={this.handleReset}
        formatValue={SatisfactionOption.handleFormat}
      >
        <Slider
          min={0}
          max={100}
          step={1}
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
  const { satisfaction: initialValue } = kpiSettingsSelectors.getSettingsData(state);

  const currentValue = kpiSettingsSelectors.getSatisfaction(state);

  return {
    status,
    initialValue,
    currentValue
  };
};

const mapDispatchToProps = {
  setValue: setSatisfactionValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SatisfactionOption);
