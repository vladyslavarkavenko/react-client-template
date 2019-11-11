import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import { connect } from 'react-redux';

import { setCtruValue } from '../../modules/kpiSettings/kpiSettingsActions';
import OptionWrapper from './OptionWrapper';

import kpiSettingsSelectors from '../../modules/kpiSettings/kpiSettingsSelectors';

class CtruScoreOption extends React.Component {
  static handleFormat(value) {
    if (Number.isNaN(value)) {
      return '-';
    }

    return `${value.toFixed(1)}`;
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
        title="cTRU Score"
        oldValue={initialValue}
        newValue={currentValue}
        handleReset={this.handleReset}
        formatValue={CtruScoreOption.handleFormat}
      >
        <Slider
          min={1}
          max={10}
          step={0.5}
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
  const { ctruScore: initialValue } = kpiSettingsSelectors.getSettingsData(state);

  const currentValue = kpiSettingsSelectors.getCtru(state);

  return {
    status,
    initialValue,
    currentValue
  };
};

const mapDispatchToProps = {
  setValue: setCtruValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CtruScoreOption);
