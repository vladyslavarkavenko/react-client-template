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
    const { initialValue, currentValue, realValue, setValue } = this.props;

    const diffArr = [
      {
        mark: 'Real',
        title: 'Real cTRU Score',
        value: realValue,
        diff: currentValue - realValue
      }
    ];

    const marks = {};

    diffArr.forEach(({ value, mark }) => {
      marks[value] = mark;
    });

    return (
      <OptionWrapper
        title="cTRU Score"
        oldValue={initialValue}
        newValue={currentValue}
        diffArr={diffArr}
        handleReset={this.handleReset}
        formatValue={CtruScoreOption.handleFormat}
      >
        <Slider
          min={1}
          max={10}
          step={0.1}
          onChange={setValue}
          value={currentValue}
          marks={marks}
          className="kpi-slider"
        />
      </OptionWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const status = kpiSettingsSelectors.getSettingsStatus(state);
  const { ctru: initialValue } = kpiSettingsSelectors.getSettingsTarget(state);
  const { ctru = 0 } = kpiSettingsSelectors.getSettingsActual(state);

  const currentValue = kpiSettingsSelectors.getCtru(state);

  return {
    status,
    initialValue,
    currentValue,
    realValue: ctru
  };
};

const mapDispatchToProps = {
  setValue: setCtruValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CtruScoreOption);
