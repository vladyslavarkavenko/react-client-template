import React from 'react';

export default function SimpleContentHeader({ title, subTitle, customButtons }) {
  return (
    <div className="content-header">
      <div className="info simple">
        <div className="text-block">
          {title && <h1>{title}</h1>}
          {subTitle && <h2>{subTitle}</h2>}
        </div>
        {customButtons && <div className="buttons-block">{customButtons}</div>}
      </div>
    </div>
  );
}
