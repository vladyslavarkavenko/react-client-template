import React from 'react';

import { HEADER_ICONS, BTN_TYPES } from '../../../constants';
import SvgPen from '../../../../../public/assets/svg/pen.svg';
import SvgCamera from '../../../../../public/assets/svg/camera.svg';
import SvgDelete from '../../../../../public/assets/svg/delete.svg';

const { PEN, CAMERA, DELETE } = HEADER_ICONS;
const { WHITE } = BTN_TYPES;

const Button = ({ onClick, title, icon, className, type = WHITE }) => {
  let Svg;
  switch (icon) {
    case PEN:
      Svg = SvgPen;
      break;
    case CAMERA:
      Svg = SvgCamera;
      break;
    case DELETE:
      Svg = SvgDelete;
      break;
    default:
      Svg = null;
      break;
  }

  const newClassName = `btn btn-${type} ${className || ''}`;

  return (
    <button className={newClassName} onClick={onClick}>
      {Svg && <Svg />}
      {title}
    </button>
  );
};

export default Button;
