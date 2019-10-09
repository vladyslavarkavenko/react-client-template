import React from 'react';

export default function BlockWrapper({ title, children }) {
  return (
    <div className="info-block">
      {typeof title === 'string' ? <h1 className="info-block__title">{title}</h1> : title}
      {children}
    </div>
  );
}
