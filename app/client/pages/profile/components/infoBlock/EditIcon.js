import React from 'react';

import SvgPen from '../../../../../../public/assets/svg/pen.svg';

const EditIcon = ({ onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="edit-icon" onClick={onClick}>
      <SvgPen />
    </div>
  );
};

export default EditIcon;
