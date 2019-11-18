/* eslint-disable */

import React from 'react';

import Button from '../../components/ui-components/Form/Button';
import ArrowUp from '../../../../public/assets/svg/arrow-up.regular.svg';

// function DiffComponent({ rawDiff, formatValue }) {
//   let flag = '';
//   let value = Math.abs(rawDiff);
//
//   if (rawDiff < 0) {
//     flag = 'red';
//   }
//
//   if (rawDiff > 0) {
//     flag = 'green';
//   }
//
//   if (typeof formatValue === 'function') {
//     value = formatValue(value);
//   }
//
//   return (
//     <span className={`value diff ${flag}`}>
//       {(flag === 'green' || flag === 'red') && <ArrowSvg />}
//       {value}
//     </span>
//   );
// }

function DiffComponent({ rawDiff, formatValue }) {
  const value = typeof formatValue === 'function' ? formatValue(rawDiff) : rawDiff;

  if (rawDiff === 0) {
    return (
      <span className="values-diff">
        {value}
        <ArrowUp />
      </span>
    );
  }

  if (rawDiff > 0) {
    return (
      <span className="values-diff green">
        +{value}
        <ArrowUp />
      </span>
    );
  }

  if (rawDiff < 0) {
    return (
      <span className="values-diff red">
        {value}
        <ArrowUp />
      </span>
    );
  }
}

export default function OptionWrapper(props) {
  const { title, formatValue, children, handleReset } = props;
  let { oldValue, newValue, diffArr } = props;

  const showReset = oldValue !== newValue;

  if (typeof formatValue === 'function') {
    oldValue = formatValue(oldValue);
    newValue = formatValue(newValue);
  }

  const diffList = diffArr.map((item) => {
    const value = typeof formatValue === 'function' ? formatValue(item.value) : item.value;

    return (
      <div className="real-data__block" key={`kpi_${item.title}`}>
        <div className="real-data__item">
          <span className="label">{item.title}</span>
          <span className="value">({value})</span>
        </div>

        {item.diff !== null && (
          <div className="real-data__diff">
            <DiffComponent rawDiff={item.diff} formatValue={formatValue} />
          </div>
        )}
      </div>
    );
  });

  return (
    <li className="kpi-options__item">
      <p className="title">{title}</p>
      {/*<p className="subtitle">*/}
      {/*  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has*/}
      {/*  been the industrys standard dummy text ever since the 1500s, when an unknown printer took a*/}
      {/*  galley of type and scrambled it to make a type specimen book. It has survived not only five*/}
      {/*</p>*/}

      <div className="values__container">
        {/*<p className="values__title">Target</p>*/}
        <ul className="values__list">
          <div className="values__item">
            <span className="label">Previous</span>
            <span className="value">{oldValue}</span>
          </div>

          <div className="values__item">
            <span className="label">Current</span>
            <span className="value">{newValue}</span>
          </div>
        </ul>
      </div>
      <div className="slider-block">{children}</div>

      <div className="real-data__container">{diffList}</div>
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
