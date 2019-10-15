import React from 'react';

import { STAFF_TABLE_STATUS } from '../../../utils/constants';
import CheckboxInput from '../../../components/ui-components/Form/CheckboxInput';
import ReadRow from './ReadRow';
import InputRow from './InputRow';

export default function Table({
  list,
  errors,
  checked,
  handleSelectAll,
  handleEdit,
  readOnly,
  table
}) {
  const rows = list.map((item) => {
    if (!item.status) {
      return (
        <InputRow
          key={item.id}
          data={item}
          errors={errors[item.id]}
          table={table}
          handleEdit={handleEdit}
        />
      );
    }

    if (
      readOnly ||
      item.status === STAFF_TABLE_STATUS.BLOCKED ||
      item.status === STAFF_TABLE_STATUS.PENDING
    ) {
      return <ReadRow key={item.id} data={item} table={table} handleEdit={handleEdit} />;
    }

    return (
      <InputRow
        key={item.id}
        data={item}
        errors={errors[item.id]}
        table={table}
        handleEdit={handleEdit}
        onlyDropEdit
      />
    );
  });

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
        <li className="item item-manager">Manager</li>
        <li className="item item-status">Status</li>
      </ul>
      <ul className="body">{rows}</ul>
    </div>
  );
}
