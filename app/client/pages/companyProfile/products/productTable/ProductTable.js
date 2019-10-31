import React from 'react';

import HeaderRow from './components/HeaderRow';
import SubjectRow from './components/SubjectRow';

export default function ProductTable({ tags, subjects }) {
  const rows = subjects.map((sub) => <SubjectRow key={`${sub.id}_row`} tags={tags} data={sub} />);

  return (
    <div className="service-table">
      <HeaderRow tags={tags} />
      <ul className="body">{rows}</ul>
    </div>
  );
}
