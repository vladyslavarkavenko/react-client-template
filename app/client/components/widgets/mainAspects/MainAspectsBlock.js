import React from 'react';

import RationalSvg from '../../../../../public/assets/svg/categories/puzzle.svg';
import ProcessSvg from '../../../../../public/assets/svg/categories/cogs.svg';
import FeelingSvg from '../../../../../public/assets/svg/categories/hand-heart.svg';
import ResultSvg from '../../../../../public/assets/svg/categories/bullseye-arrow.svg';
import { LoaderBlock } from '../../ui-components/Layout/Loader';

const aspectSvg = {
  1: <ProcessSvg />,
  2: <RationalSvg />,
  3: <ResultSvg />,
  4: <FeelingSvg />
};

// const mockData = [
//   { id: 1, name: 'Process' },
//   { id: 2, name: 'Rational' },
//   { id: 3, name: 'Result' }
// ];

export default function MainAspectsBlock({ data }) {
  let list;

  if (!data) {
    list = <LoaderBlock />;
  } else {
    list = data.slice(0, 3).map(({ id, name }) => (
      <li className={`widget-aspect__item theme-${id}`} key={`${id}_my_asp`}>
        <span className="aspect-icon">{aspectSvg[id]}</span>
        <span className="background-icon">{aspectSvg[id]}</span>
        <p className="label">{name}</p>
      </li>
    ));
  }

  return (
    <>
      <h2 className="info-block__title">My main aspects</h2>
      <ul className="widget-aspect__list">{list}</ul>
    </>
  );
}
