import React from 'react';

import ProgressBar from '../ui-components/ProgressBar';
import { LoaderBlock } from '../ui-components/Layout/Loader';

// const mockData = [
//   { id: 2, name: 'Convenient', sumImportance: 90 },
//   { id: 1, name: 'Creative', sumImportance: 75 },
//   { id: 4, name: 'Clear', sumImportance: 70 },
//   { id: 6, name: 'Compensating', sumImportance: 55 }
// ];

export default function MainCriteriaBlock({ data }) {
  let list;

  if (!data) {
    list = <LoaderBlock />;
  } else {
    list = data
      .sort((a, b) => b.sumImportance - a.sumImportance)
      .map(({ id, name, sumImportance }) => (
        <li key={`${id}_m_crit_w`} className={`widget-main-criteria__item theme-${id}`}>
          <span className="label">{name}</span>
          <ProgressBar percentage={sumImportance} />
        </li>
      ));
  }

  return <ul className="widget-main-criteria__list">{list}</ul>;
}
