/* eslint-disable */
import React from 'react';
import CheckboxInput from '../../../components/ui-components/Form/CheckboxInput';
// import RoleSelect from './RoleSelect';
import StatusLabel from './StatusLabel';
import ManagerSelect from './ManagerSelect';

export default function ReadRow({ table, data, handleEdit }) {
  const { id, firstName, lastName, email, isChecked, status, manager } = data;

  return (
    <li className={`row ${isChecked ? 'checked' : ''}`}>
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
      <div className="item item-name">
        <span>{firstName}</span>
      </div>
      <div className="item item-surname">
        <span>{lastName}</span>
      </div>
      <div className="item item-email">
        <span>{email}</span>
      </div>
      <div className="item item-manager drop">
        <ManagerSelect rowId={id} table={table} manager={manager} readOnly />
      </div>

      <div className="item item-status">
        <StatusLabel status={status} />
      </div>
    </li>
  );
}
