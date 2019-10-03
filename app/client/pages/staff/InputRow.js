import React from 'react';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';
import RoleSelect from './RoleSelect';
import TopicSelect from './TopicSelect';

export default function InputRow({ table, data, handleEdit, handleChangeRole }) {
  const { id, firstName, lastName, email, isChecked, roles } = data;

  return (
    <li className="row">
      <div className="item">
        <CheckboxInput
          labelText=" "
          name={id}
          onChange={handleEdit}
          data-id={id}
          checked={isChecked}
          data-field="isChecked"
        />
      </div>
      <div className="item">
        <input
          type="text"
          defaultValue={firstName}
          data-id={id}
          data-field="firstName"
          onBlur={handleEdit}
        />
      </div>
      <div className="item">
        <input
          type="text"
          defaultValue={lastName}
          data-id={id}
          data-field="lastName"
          onBlur={handleEdit}
        />
      </div>
      <div className="item">
        <input
          type="text"
          defaultValue={email}
          data-id={id}
          data-field="email"
          onBlur={handleEdit}
        />
      </div>
      <div className="item drop">
        <RoleSelect handleChange={handleChangeRole} rowId={id} table={table} roles={roles} />
      </div>
      <div className="item drop">
        <TopicSelect rowId={id} table={table} />
      </div>
      <div className="item">
        <input type="text" defaultValue="-" />
      </div>
    </li>
  );
}
