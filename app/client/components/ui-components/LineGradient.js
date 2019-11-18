import React from 'react';

export default function LineGradient({ name, color }) {
  return (
    <linearGradient id={name} x1={0} y1={0} x2={0} y2={1}>
      <stop offset="0%" stopColor={color} stopOpacity={0.1} />
      <stop offset="25%" stopColor={color} stopOpacity={0.05} />
      <stop offset="75%" stopColor={color} stopOpacity={0.0} />
    </linearGradient>
  );
}
