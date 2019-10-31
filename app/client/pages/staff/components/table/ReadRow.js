import React from 'react';
import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';
import RoleSelect from './RoleSelect';
import SubjectSelect from './SubjectSelect';
import StatusLabel from './StatusLabel';

export default function ReadRow({ table, data, handleEdit, multipleRoles }) {
  const { id, firstName, lastName, email, isChecked, roles, status } = data;

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
      <div className="item item-roles drop">
        <RoleSelect rowId={id} table={table} multipleRoles={multipleRoles} roles={roles} readOnly />
      </div>
      <div className="item item-subjects drop">
        <SubjectSelect rowId={id} table={table} readOnly />
      </div>
      <div className="item item-status">
        <StatusLabel status={status} />
      </div>
    </li>
  );
}
