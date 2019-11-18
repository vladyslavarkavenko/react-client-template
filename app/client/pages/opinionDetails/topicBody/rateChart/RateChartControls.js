import React from 'react';
import { connect } from 'react-redux';

import {
  setDateOffset,
  setLineFilter,
  handleNextOffset,
  handlePrevOffset
} from '../../../../modules/opinionDetails/opinionDetailsActions';
import ArrowSvg from '../../../../../../public/assets/svg/arrow-down.svg';
import opinionDetailsSelectors from '../../../../modules/opinionDetails/opinionDetailsSelectors';
import RadioGroup from '../../../../components/ui-components/Form/RadioGroup';
import { DATE_OFFSET, LINE_TYPES } from '../../../../modules/opinionDetails/helpers/constants';

function RateChartControls({
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
      <div className="topic-details__filter">
        <RadioGroup
          name="line_filter"
          options={[
            { title: 'Satisfaction', value: LINE_TYPES.SATISFACTION },
            { title: 'Importance', value: LINE_TYPES.IMPORTANCE },
            { title: 'Both', value: LINE_TYPES.BOTH }
          ]}
          selected={lineFilter.length === 2 ? LINE_TYPES.BOTH : lineFilter[0]}
          handleChange={setLineFilter}
        />
      </div>

      <div className="topic-details__control">
        <div className="date-range">
          <RadioGroup
            name="date_offset"
            options={[
              { title: 'Week', value: DATE_OFFSET.WEEK },
              { title: 'Month', value: DATE_OFFSET.MONTH },
              { title: 'Year', value: DATE_OFFSET.YEAR }
            ]}
            selected={dateOffset}
            handleChange={setDateOffset}
            theme="gray"
          />
        </div>

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
  const { maxStep, step } = opinionDetailsSelectors.getChartPagination(state);

  const isNextDisabled = step <= 1;
  const isPrevDisabled = step >= maxStep;

  return {
    isNextDisabled,
    isPrevDisabled,

    lineFilter: opinionDetailsSelectors.getLineFilter(state),
    dateOffset: opinionDetailsSelectors.getDateOffset(state)
  };
};

const mapDispatchToProps = {
  setDateOffset,
  setLineFilter,
  handleNextOffset,
  handlePrevOffset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateChartControls);
