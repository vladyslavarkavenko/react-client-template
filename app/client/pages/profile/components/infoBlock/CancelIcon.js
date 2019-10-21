import React from 'react';

import SvgCross from '../../../../../../public/assets/svg/cross.svg';

const CancelIcon = ({ onClick }) => {
  return (
    <div className="icon cancel-icon" onClick={onClick}>
      <SvgCross />
    </div>
  );
};

export default CancelIcon;
