import React from 'react';

export default function RadioGroup({ name, options, selected, handleChange }) {
  const buttons = options.map((opt) => (
    <label className={`btn ${selected === opt.value ? 'active' : ''}`} key={`${name}_${opt}`}>
      <input
        type="radio"
        name={name}
        value={opt.value}
        autoComplete="off"
        onChange={() => handleChange(opt.value)}
      />
      {opt.title}
    </label>
  ));

  return <div className="radio-group">{buttons}</div>;
}
