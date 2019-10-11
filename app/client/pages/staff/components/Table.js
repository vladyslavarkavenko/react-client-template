import React from 'react';
import CheckboxInput from '../../../components/ui-components/Form/CheckboxInput';
import ReadRow from './ReadRow';
import InputRow from './InputRow';

export default function Table({
  list,
  errors,
  checked,
  handleSelectAll,
  handleEdit,
  handleChangeRole,
  readOnly,
  table,
  multipleRoles,
  onlyDropEdit
  // isRequest
}) {
  const rows = list.map((item) =>
    readOnly || item.status === 'Blocked' ? (
      <ReadRow
        key={item.id}
        data={item}
        table={table}
        handleEdit={handleEdit}
        multipleRoles={multipleRoles}
      />
    ) : (
      <InputRow
        key={item.id}
        data={item}
        errors={errors[item.id]}
        table={table}
        handleEdit={handleEdit}
        handleChangeRole={handleChangeRole}
        multipleRoles={multipleRoles}
        onlyDropEdit={onlyDropEdit}
      />
    )
  );

  return (
    <div className="table">
      <ul className="head">
        <li className="item item-check">
          <CheckboxInput
            withFill
            onlyCheck
            name={`${table}_all`}
            onChange={handleSelectAll}
            checked={list.length === checked.length}
          />
        </li>
        <li className="item item-name">Name</li>
        <li className="item item-surname">Surname</li>
        <li className="item item-email">Email</li>
        <li className="item item-roles">Roles</li>
        <li className="item item-topics">Topics</li>
        <li className="item item-status">Status</li>
      </ul>
      <ul className="body">{rows}</ul>
    </div>
  );
}
