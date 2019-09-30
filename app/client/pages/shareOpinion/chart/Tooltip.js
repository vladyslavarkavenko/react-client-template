import React from 'react';
import i18next from 'i18next';

import { getCoordByPoint } from './utils';

const Tooltip = ({ data }) => {
  if (!data) {
    return null;
  }

  const { importance, satisfaction, quantity } = data;
  const { top, left } = getCoordByPoint(data);

  return (
    <div
      className="p-absolute tooltip"
      style={{
        top: top - 5,
        left: left + 15
      }}
    >
      <h6>
        {quantity} {i18next.t('shareOpinion.opinions')}
      </h6>
      <p>
        {i18next.t('shareOpinion.i')} {importance}
      </p>
      <p>
        {i18next.t('shareOpinion.s')} {satisfaction}
      </p>
    </div>
  );
};

export default Tooltip;
