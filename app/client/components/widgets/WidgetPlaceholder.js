import React from 'react';

import DataSvg from '../../../../public/assets/svg/stream.duotone.svg';

export default function WidgetPlaceholder({ icon, title = 'No Data Yet', withWrapper }) {
  return (
    <div className={`widget-placeholder ${withWrapper ? 'widget-wrap' : ''}`}>
      <div className="widget-placeholder__wrap">
        <div className="widget-placeholder__icon">{icon || <DataSvg />}</div>
        <p className="widget-placeholder__title">{title}</p>
      </div>
    </div>
  );
}
