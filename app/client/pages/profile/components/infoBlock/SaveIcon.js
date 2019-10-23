import React from 'react';

import SvgCheck from '../../../../../../public/assets/svg/check-circle.solid.svg';

const SaveIcon = ({ onClick }) => {
  return (
    <div className="icon save-icon" onClick={onClick}>
      <SvgCheck />
    </div>
  );
};

export default SaveIcon;
