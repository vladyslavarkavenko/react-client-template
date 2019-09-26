import React from 'react';

// should be in <div className="m-btn-list">
export default function ModalWhiteButton({ className = '', children, ...otherProps }) {
  return (
    <button type="button" className={`m-btn m-btn__white ${className}`} {...otherProps}>
      {children}
    </button>
  );
}
