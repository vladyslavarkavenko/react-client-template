import React from 'react';
/* eslint-disable */

import { LEGEND_COLORS } from './const';
import Select from 'react-select';
// import SortSvg from '../../../../../public/assets/svg/sort.solid.svg';

const { IMPORTANCE, SATISFACTION } = LEGEND_COLORS;

// const DropdownIndicator = (props) => (
//   <components.DropdownIndicator {...props}>
//     <SortSvg className="drop-icon" />
//   </components.DropdownIndicator>
// );

const RadarTitle = ({ options, selected, handleSelect }) => (
  <div className="radar-header d-flex jc-between ai-center">
    <h2 className="m-0 info-block__title">cTRU Radar</h2>
    <div className="d-flex">
      <div className="indicator flex-center">
        <span style={{ background: IMPORTANCE }} />
        <p>Importance</p>
      </div>
      <div className="indicator flex-center">
        <span style={{ background: SATISFACTION }} />
        <p>Satisfaction</p>
      </div>
    </div>
    {options && (
      <Select
        className="radar-select__container"
        classNamePrefix="radar-select"
        options={options}
        value={selected}
        onChange={handleSelect}
        components={{
          IndicatorSeparator: null
          // DropdownIndicator
        }}
      />
    )}
  </div>
);

export default RadarTitle;
