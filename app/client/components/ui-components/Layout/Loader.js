import React from 'react';
import LoaderSvg from '../../../../../public/assets/svg/loader.svg';

export default function Loader() {
  return (
    <div className="loading">
      <div className="lds-dual-ring" />
    </div>
  );
}

export function InlineSvgLoader() {
  return <LoaderSvg />;
}

export function InlineLoader() {
  return <div className="preloader" />;
}

export function LoaderBlock({ width = '100%', height = 'auto' }) {
  return (
    <div
      className="loader-block"
      style={{
        width,
        height
      }}
    >
      <LoaderSvg className="loader-svg" />
    </div>
  );
}
