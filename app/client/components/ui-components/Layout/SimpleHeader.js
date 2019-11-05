import React from 'react';

export default function SimpleHeader({
  title,
  subTitle,
  customButtons,
  className = 'simple',
  children
}) {
  return (
    <div className="content-header">
      <div className={`info ${className}`}>
        <div className="text-block">
          {title && <h1>{title}</h1>}
          {subTitle && <h2>{subTitle}</h2>}
        </div>
        {customButtons && <div className="buttons-block">{customButtons}</div>}
        {children}
      </div>
    </div>
  );
}
