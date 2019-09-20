import React from 'react';

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
