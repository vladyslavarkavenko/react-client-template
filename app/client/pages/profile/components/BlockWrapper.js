import React from 'react';

export default function BlockWrapper({ title, children }) {
  return (
    <div className="info-block">
      {typeof title === 'string' ? <h2 className="info-block__title">{title}</h2> : title}
      {children}
    </div>
  );
}
