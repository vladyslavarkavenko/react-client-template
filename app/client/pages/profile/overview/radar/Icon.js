import React from 'react';
import ReactSVG from 'react-svg';

import { FEATURES, CATEGORIES } from '../const';

const { ICONS: F_ICONS, BACKGROUND: F_BG } = FEATURES;
const { ICONS: C_ICONS, BACKGROUND: C_BG } = CATEGORIES;

const Icon = ({ line, name, style, onClick }) => {
  const src = { ...F_ICONS, ...C_ICONS }[name];
  const background = { ...F_BG, ...C_BG }[name];

  const s = {
    ...style,
    background
  };

  return (
    <>
      <div className="circle p-absolute" style={s} onClick={onClick}>
        <ReactSVG src={src} />
      </div>
      {line && <div className="line" style={s} />}
    </>
  );
};

export default Icon;
