import React from 'react';

export default function TextInput({
  name,
  type = 'text',
  labelText,
  onChange,
  error,
  className,
  forwardRef,
  children,
  ...rest
}) {
  const key = `${name}_${type}_input`;
  return (
    <div className={`input-block form__row ${className || ''}`}>
      {error && <span className="input-error-message">{error}</span>}
      {labelText && (
        <label htmlFor={key} className="form__row-label">
          {labelText}
        </label>
      )}
      <input
        id={key}
        className={`form__row-input ${error ? 'input-error' : ''}`}
        onChange={onChange}
        name={name}
        type={type}
        ref={forwardRef}
        {...rest}
      />
      {children}
    </div>
  );
}
