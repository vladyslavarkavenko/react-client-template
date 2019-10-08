import React from 'react';
import ReactSVG from 'react-svg';

import { CATEGORIES } from '../const';

const { NAMES, ICONS } = CATEGORIES;

const CategoriesLabels = ({ onClick }) => (
  <>
    {Object.values(NAMES).map((name, index) => (
      <button key={name} className={`category category-${index}`} onClick={() => onClick(name)}>
        <ReactSVG src={ICONS[name]} />
        {name}
      </button>
    ))}
  </>
);

export default CategoriesLabels;
