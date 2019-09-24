import React from 'react';
import LoaderSvg from '../../../../../public/assets/svg/loader.svg';

export default function Loader() {
  return (
    <div className="loading">
      <div className="lds-dual-ring" />
    </div>
  );
}

export function InlineLoader() {
  return <div className="preloader" />;
}

// style={{ height: '50px', width: '50px' }}
//style={{ width: '100%' }}
export function LoaderImg() {
  return (
    <div className="loader-block">
      <LoaderSvg className="loader-svg" />
    </div>
  );
}
