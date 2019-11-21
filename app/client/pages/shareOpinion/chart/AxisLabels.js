import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';

import PROPS from './chartProperties';

import StarSvg from '../../../../../public/assets/svg/star.svg';
import SmileSvg from '../../../../../public/assets/svg/smile.svg';
import deviceSelectors from '../../../modules/device/deviceSelectors';

const { heightFactor: hf, widthFactor: wf, padding: p } = PROPS;

const CustomLabelX = ({ height: h, width: w }) => {
  return (
    <div className="label p-absolute" style={{ top: h - p / 2, left: w / 2 }}>
      <SmileSvg />
      {i18next.t('shareOpinion.s')}
    </div>
  );
};

const CustomLabelY = ({ height: h }) => {
  return (
    <div className="label label-y p-absolute" style={{ top: h / 2, left: p / 2 }}>
      <StarSvg />
      {i18next.t('shareOpinion.i')}
    </div>
  );
};

const AxisLabels = ({ height, width }) => (
  <>
    <CustomLabelX height={height} width={width} />
    <CustomLabelY height={height} />
  </>
);

const mapStateToProps = (state) => ({
  width: wf * deviceSelectors.currentWidth(state),
  height: hf * deviceSelectors.currentHeight(state)
});

export default connect(mapStateToProps)(AxisLabels);
