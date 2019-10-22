import React from 'react';

export default function CheckboxInput({
  name,
  labelText,
  onChange,
  error,
  className,
  checked,
  withFill,
  onlyCheck,
  forwardRef,
  readOnly,
  ...rest
}) {
  const key = `${name}_check`;

  const style = ['checkbox'];

  if (className) {
    style.push(className);
  }

  if (withFill) {
    style.push('blue-fill');
  }

  if (onlyCheck) {
    style.push('check-only');
  }

  if (error) {
    style.push('checkbox-error');
  }

  //checkbox-form
  return (
    <div className={style.join(' ')}>
      {error && <span className="input-error-message">{error}</span>}
      <input
        id={key}
        checked={checked}
        onChange={onChange}
        name={name}
        type="checkbox"
        disabled={readOnly}
        ref={forwardRef}
        {...rest}
      />
      <label htmlFor={key}>{labelText}</label>
    </div>
  );
}
