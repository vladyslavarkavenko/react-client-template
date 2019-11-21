import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import { connect } from 'react-redux';

import { setParticipationValue } from '../../modules/kpiSettings/kpiSettingsActions';
import OptionWrapper from './OptionWrapper';
import kpiSettingsSelectors from '../../modules/kpiSettings/kpiSettingsSelectors';

class ParticipationOption extends React.Component {
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
        title: 'Participation Share',
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
        title="Participation Share"
        oldValue={initialValue}
        newValue={currentValue}
        diffArr={diffArr}
        handleReset={this.handleReset}
        formatValue={ParticipationOption.handleFormat}
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
  const { participation: initialValue } = kpiSettingsSelectors.getSettingsTarget(state);
  const { participation = 0 } = kpiSettingsSelectors.getSettingsActual(state);

  const currentValue = kpiSettingsSelectors.getParticipation(state);

  return {
    status,
    initialValue,
    currentValue,
    realValue: participation
  };
};

const mapDispatchToProps = {
  setValue: setParticipationValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipationOption);
