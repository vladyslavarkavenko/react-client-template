/* eslint-disable */
import React from 'react';
import CheckboxInput from '../../../components/ui-components/Form/CheckboxInput';
import RoleSelect from './RoleSelect';
import TopicSelect from './TopicSelect';

export default function ReadRow({ table, data, handleEdit }) {
  const { id, firstName, lastName, email, isChecked, roles, status } = data;

  return (
    <li className="row">
      <div className="item item-check">
        <CheckboxInput
          name={id}
          onChange={handleEdit}
          withFill
          onlyCheck
          data-id={id}
          checked={isChecked}
          data-field="isChecked"
        />
      </div>
      <div className="item">{firstName}</div>
      <div className="item">{lastName}</div>
      <div className="item">{email}</div>
      <div className="item item-x2 drop">
        <RoleSelect rowId={id} table={table} roles={roles} readOnly />
      </div>
      <div className="item item-x3 drop">
        <TopicSelect rowId={id} table={table} readOnly />
      </div>
      <div className="item">{status || '-'}</div>
    </li>
  );
}
