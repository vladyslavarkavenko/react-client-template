import React from 'react';

export default function ButtonRow({ handleCreate }) {
  return (
    <li className="row">
      <button className="add-new-btn" type="button" onClick={() => handleCreate()}>
        + Add Row
      </button>
    </li>
  );
}
