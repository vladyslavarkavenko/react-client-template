import React from 'react';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';
import Row from './Row';
import InputRow from './InputRow';

export default function Table({ list, handleEdit, handleChangeRole, readOnly, table }) {
  const rows = list.map((item) =>
    readOnly ? (
      <Row />
    ) : (
      <InputRow
        data={item}
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
        <li className="item">
          <CheckboxInput labelText=" " name="all" />
        </li>
        <li className="item">Name</li>
        <li className="item">Surname</li>
        <li className="item">Email</li>
        <li className="item">Roles</li>
        <li className="item">Topics</li>

        {/*<li className="item nested">*/}
        {/*  <div className="item main">Access Level</div>*/}
        {/*  <div className="item">Object</div>*/}
        {/*  <div className="item">Manager</div>*/}
        {/*  <div className="item">Admin</div>*/}
        {/*</li>*/}
        <li className="item">Status</li>
      </ul>
      <ul className="body">{rows}</ul>
      {/*<button className="add-new-btn">Add New</button>*/}
    </div>
  );
}
