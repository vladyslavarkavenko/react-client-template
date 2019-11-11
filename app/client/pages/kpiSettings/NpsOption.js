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
    const { currentValue, initialValue, setValue } = this.props;

    return (
      <OptionWrapper
        title="Net Promoter Score"
        oldValue={initialValue}
        newValue={currentValue}
        handleReset={this.handleReset}
        formatValue={NpsOption.handleFormat}
      >
        <Slider
          min={-100}
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
  const { nps: initialValue } = kpiSettingsSelectors.getSettingsData(state);

  const currentValue = kpiSettingsSelectors.getNPS(state);

  return {
    status,
    initialValue,
    currentValue
  };
};

const mapDispatchToProps = {
  setValue: setNPSValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NpsOption);
