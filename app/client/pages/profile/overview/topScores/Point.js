import React from 'react';

// from _top-scores-chart.less
const dotSizes = {
  white: '11px', // 22px / 2 = 12px
  inner: '8px', // 16px / 2 = 8px
  center: '4px' // 8px / 2 = 4px
};

export default function Point({ position, className }) {
  if (!position) {
    <>
      <span className={`point ${className}`} />
      <span className={`point ${className} inner`} />
      <span className={`point ${className} center`} />
    </>;
  }

  return (
    <>
      <span
        className={`point ${className}`}
        style={{
          left: `calc(${position}% - ${dotSizes.white})`
        }}
      />
      <span
        className={`point ${className} inner`}
        style={{
          left: `calc(${position}% - ${dotSizes.inner})`
        }}
      />
      <span
        className={`point ${className} center`}
        style={{
          left: `calc(${position}% - ${dotSizes.center})`
        }}
      />
    </>
  );
}
