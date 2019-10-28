import React from 'react';

const mockData = [
  { id: 1, name: 'Mortage' },
  { id: 2, name: 'Investments Funds' },
  { id: 3, name: 'Saving account' },
  { id: 4, name: 'Branch' },
  { id: 5, name: 'E-banking' }
];

export default function SubjectsBlock({ subjects = mockData, key }) {
  const list = subjects.map(({ id, name }) => (
    <li key={`${id}_${key}_sub_w`} className="widget-subject__item">
      {name}
    </li>
  ));

  return <ul className="widget-subject__list">{list}</ul>;
}
