import React from 'react';

export default function ButtonFullBlock({ title, handleClick, ...rest }) {
  return (
    <div className="component btn-full-block">
      <button type="button" className="btn" onClick={handleClick} {...rest}>
        {title}
      </button>
    </div>
  );
}
