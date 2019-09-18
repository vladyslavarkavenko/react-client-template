import React from 'react';

// TODO: Set up this for checkboxes too.

export default function CustomInput({
  id,
  name,
  type = 'text',
  labelText,
  onChange,
  error,
  className,
  ...rest
}) {
  return (
    <div className={`input-block form__row ${className || ''}`}>
      {error && <span className="input-error-message">{error}</span>}
      {labelText && (
        <label htmlFor={id || name} className="form__row-label">
          {labelText}
        </label>
      )}
      <input
        id={id || name}
        className={`form__row-input ${error ? 'input-error' : ''}`}
        onChange={onChange}
        name={name}
        type={type}
        {...rest}
      />
    </div>
  );
}
