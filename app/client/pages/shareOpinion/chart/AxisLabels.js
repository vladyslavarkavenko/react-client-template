import React from 'react';
import i18next from 'i18next';

import chartProperties from './chartProperties';

import StarSvg from '../../../../../public/assets/svg/star.svg';
import SmileSvg from '../../../../../public/assets/svg/smile.svg';

const { height: h, width: w, padding: p } = chartProperties;

const CustomLabelX = () => {
  return (
    <div className="label p-absolute" style={{ top: h - p / 2, left: w / 2 }}>
      <SmileSvg />
      {i18next.t('shareOpinion.s')}
    </div>
  );
};

const CustomLabelY = () => {
  return (
    <div className="label label-y p-absolute" style={{ top: h / 2, left: p / 2 }}>
      <StarSvg />
      {i18next.t('shareOpinion.i')}
    </div>
  );
};

const AxisLabels = () => (
  <>
    <CustomLabelX />
    <CustomLabelY />
  </>
);

export default AxisLabels;
