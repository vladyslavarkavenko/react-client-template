import React from 'react';

// should be in <div className="m-btn-list">
export default function ModalThemeButton({ className = '', children, ...otherProps }) {
  return (
    <button type="button" className={`m-btn m-btn__theme ${className}`} {...otherProps}>
      {children}
    </button>
  );
}
