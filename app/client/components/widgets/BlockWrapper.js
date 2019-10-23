import React from 'react';

export default function BlockWrapper({ title, children, className }) {
  return (
    <div className={`info-block ${className || ''}`}>
      {typeof title === 'string' ? <h2 className="info-block__title">{title}</h2> : title}
      {children}
    </div>
  );
}
