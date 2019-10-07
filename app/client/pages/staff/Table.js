import React from 'react';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';
import ReadRow from './ReadRow';
import InputRow from './InputRow';

export default function Table({
  list,
  errors,
  handleSelectAll,
  handleEdit,
  handleChangeRole,
  readOnly,
  table
  // isRequest
}) {
  const rows = list.map((item) =>
    readOnly ? (
      <ReadRow data={item} />
    ) : (
      <InputRow
        data={item}
        errors={errors[item.id]}
        key={item.id}
        table={table}
        handleEdit={handleEdit}
        handleChangeRole={handleChangeRole}
      />
    )
  );

  return (
    <div className="table">
      <ul className="head">
        <li className="item item-check">
          <CheckboxInput withFill onlyCheck name={`${table}_all`} onChange={handleSelectAll} />
        </li>
        <li className="item">Name</li>
        <li className="item">Surname</li>
        <li className="item">Email</li>
        <li className="item item-x2">Roles</li>
        <li className="item item-x3">Topics</li>
        <li className="item">Status</li>
      </ul>
      <ul className="body">{rows}</ul>
      {/*<button className="add-new-btn">Add New</button>*/}
    </div>
  );
}
