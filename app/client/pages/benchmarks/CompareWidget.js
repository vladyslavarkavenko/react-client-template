import React from 'react';
import Select from 'react-select';

/* eslint-disable */

const options = [
  { value: 1, label: 'Sara Connor' },
  { value: 2, label: 'Albert Pip' },
  { value: 3, label: 'Admin Colhoza' }
];

function getOptions(selected) {
  return options.filter((item) => selected.includes(item.value));
}

function BankerSelect() {
  const components = {
    DropdownIndicator: null
  };

  const styles = {
    container: {
      control: 'none'
    }
  };

  return (
    <Select
      options={options}
      components={components}
      className="compare-select-container"
      classNamePrefix="compare-select"
    />
  );
}

export default function CompareWidget() {
  return (
    <div className="compare-widget">
      <p className="compare-widget__title">Name of banker</p>
      <BankerSelect />
      <p className="compare-widget__title">Name of banker</p>
      <BankerSelect />

      <div className="compare-widget__ctrl">
        <button type="button" className="compare-widget__btn">
          Compare
        </button>
      </div>
    </div>
  );
}
