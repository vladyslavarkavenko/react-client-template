import React from 'react';
import Select from 'react-select';

const components = {
  DropdownIndicator: null
};

export default function StaffSelect({ handleChange, options, selected, field }) {
  return (
    <Select
      options={options}
      value={selected}
      components={components}
      onChange={(value) => handleChange({ value, field })}
      className="compare-select-container"
      classNamePrefix="compare-select"
    />
  );
}
