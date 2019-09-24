import React from 'react';

export default function NewSubjectButton({ handleModal }) {
  return (
    <li className="details-list__btn">
      <button type="button" className="add-new-btn" onClick={() => handleModal(true)}>
        + Add new
      </button>
    </li>
  );
}
