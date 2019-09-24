import React from 'react';

export default function SimpleContentHeader({ title, subTitle }) {
  return (
    <div className="content-header">
      <div className="info simple">
        {title && <h1>{title}</h1>}
        {subTitle && <h2>{subTitle}</h2>}
      </div>
    </div>
  );
}
