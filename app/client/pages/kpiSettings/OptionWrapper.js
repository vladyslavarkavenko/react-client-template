import React from 'react';

import Button from '../../components/ui-components/Form/Button';
import ArrowSvg from '../../../../public/assets/svg/sort-up.solid.svg';

function DiffComponent({ rawDiff, formatValue }) {
  let flag = '';
  let value = Math.abs(rawDiff);

  if (rawDiff < 0) {
    flag = 'red';
  }

  if (rawDiff > 0) {
    flag = 'green';
  }

  if (typeof formatValue === 'function') {
    value = formatValue(value);
  }

  return (
    <span className={`value diff ${flag}`}>
      {(flag === 'green' || flag === 'red') && <ArrowSvg />}
      {value}
    </span>
  );
}

export default function OptionWrapper(props) {
  const { title, formatValue, children, handleReset } = props;
  let { oldValue, newValue } = props;

  const rawDiff = newValue - oldValue;
  const showReset = oldValue !== newValue;

  if (typeof formatValue === 'function') {
    oldValue = formatValue(oldValue);
    newValue = formatValue(newValue);
  }

  return (
    <li className="kpi-options__item">
      <p className="title">{title}</p>
      {/*<p className="subtitle">*/}
      {/*  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has*/}
      {/*  been the industrys standard dummy text ever since the 1500s, when an unknown printer took a*/}
      {/*  galley of type and scrambled it to make a type specimen book. It has survived not only five*/}
      {/*</p>*/}
      <div className="values__container">
        <div className="values__block">
          <span className="label">Previous</span>
          <span className="value">{oldValue}</span>
        </div>

        <div className="values__block">
          <span className="label">Difference</span>
          <DiffComponent rawDiff={rawDiff} formatValue={formatValue} />
        </div>

        <div className="values__block">
          <span className="label">Current</span>
          <span className="value">{newValue}</span>
        </div>
      </div>
      <div className="slider-block">{children}</div>
      <div className="controls">
        {showReset && (
          <Button className="reset-btn" type="button" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>
    </li>
  );
}
