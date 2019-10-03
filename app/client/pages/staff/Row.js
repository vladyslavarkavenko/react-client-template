import React from 'react';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';

export default function Row() {
  return (
    <li className="row">
      <div className="item">
        <CheckboxInput labelText=" " name="123" />
      </div>
      <div className="item">Max</div>
      <div className="item">Melnychuk</div>
      <div className="item">m.max@mail.max</div>
      <div className="item">Admin, Manager</div>
      <div className="item">Subject-Topic-1, Subject-Topic-2</div>
      <div className="item">-</div>
    </li>
  );
}
