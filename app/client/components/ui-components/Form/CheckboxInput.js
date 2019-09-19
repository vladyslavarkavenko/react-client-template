import React from 'react';

export default function CheckboxInput({
  name,
  labelText,
  onChange,
  error,
  className,
  checked,
  forwardRef,
  ...rest
}) {
  const key = `${name}_check`;
  return (
    <div className={`checkbox-form ${className || ''} ${error ? 'checkbox-error' : ''}`}>
      {error && <span className="input-error-message">{error}</span>}
      <input
        id={key}
        checked={checked}
        onChange={onChange}
        name={name}
        type="checkbox"
        ref={forwardRef}
        {...rest}
      />
      {labelText && <label htmlFor={key}>{labelText}</label>}
    </div>
  );
}
