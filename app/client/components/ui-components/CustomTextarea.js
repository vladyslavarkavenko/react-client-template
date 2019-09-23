import React from 'react';

// TODO: Set up this for checkboxes too.

export default function CustomTextarea({
  id,
  name,
  labelText,
  onChange,
  error,
  className,
  ...rest
}) {
  console.log('error', error);
  return (
    <div className={`input-block form__row ${className || ''}`}>
      {error && <span className="input-error-message">{error}</span>}
      {labelText && (
        <label htmlFor={id || name} className="form__row-label">
          {labelText}
        </label>
      )}
      <textarea
        id={id || name}
        className={`form__row-input ${error ? 'input-error' : ''}`}
        onChange={onChange}
        name={name}
        {...rest}
      />
    </div>
  );
}
