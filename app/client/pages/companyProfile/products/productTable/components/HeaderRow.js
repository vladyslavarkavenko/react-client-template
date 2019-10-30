import React from 'react';

export default function HeaderRow({ tags }) {
  const list = tags.map((tag) => (
    <li key={`${tag.id}_head_r`} className="item item-product">
      {`${tag.name[0].toUpperCase()}${tag.name.slice(1)}`}
    </li>
  ));

  return (
    <ul className="head">
      <li className="item item-subject">Subject</li>
      {list}
    </ul>
  );
}
