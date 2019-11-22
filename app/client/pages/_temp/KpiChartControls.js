import React from 'react';
/* eslint-disable */
import { connect } from 'react-redux';

import {
  setLineFilter,
  handleNextOffset,
  handlePrevOffset
} from '../../modules/dashboard/dashboardActions';
import ArrowSvg from '../../../../public/assets/svg/arrow-down.svg';
import RadioGroup from '../../components/ui-components/Form/RadioGroup';
import { LINE_TYPES } from '../../modules/dashboard/helpers/constants';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';

const style = { width: '25px', height: '25px' };

function KpiChartControls({
  setDateOffset,
  setLineFilter,
  handleNextOffset,
  handlePrevOffset,
  lineFilter,
  dateOffset,
  isNextDisabled,
  isPrevDisabled
}) {
  return (
    <>
      <div className="kpi-chart__control">
        <button
          className="arrow left"
          type="button"
          onClick={() => handlePrevOffset()}
          disabled={isPrevDisabled}
        >
          <ArrowSvg />
        </button>
        <button
          className="arrow right"
          type="button"
          onClick={() => handleNextOffset()}
          disabled={isNextDisabled}
        >
          <ArrowSvg />
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { maxStep, step } = dashboardSelectors.getChartPagination(state);

  const isNextDisabled = step <= 1;
  const isPrevDisabled = step >= maxStep;

  return {
    isNextDisabled,
    isPrevDisabled,

    lineFilter: dashboardSelectors.getLineFilter(state)
  };
};

const mapDispatchToProps = {
  setLineFilter,
  handleNextOffset,
  handlePrevOffset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KpiChartControls);
