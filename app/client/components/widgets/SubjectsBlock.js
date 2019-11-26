import React from 'react';
import { LoaderBlock } from '../ui-components/Layout/Loader';

// const mockData = [
//   { id: 1, name: 'Mortgage' },
//   { id: 2, name: 'Investments Funds' },
//   { id: 3, name: 'Saving account' },
//   { id: 4, name: 'Branch' },
//   { id: 5, name: 'E-banking' }
// ];

export default function SubjectsBlock({ data, additionalKey }) {
  let list;

  if (!data) {
    list = <LoaderBlock />;
  } else {
    list = data.map(({ id, name }) => (
      <li key={`${id}_${additionalKey}_sub_w`} className="widget-subject__item">
        {name}
      </li>
    ));
  }

  return <ul className="widget-subject__list">{list}</ul>;
}
