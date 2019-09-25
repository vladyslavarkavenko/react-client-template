import React from 'react';
import { connect } from 'react-redux';
import { pushNewTopic } from '../../../../modules/shareOpinion/shareOpinionActions';

function NewSubjectButton({ handleModal }) {
  return (
    <li className="details-list__btn">
      <button type="button" className="add-new-btn" onClick={() => handleModal()}>
        + Add new
      </button>
    </li>
  );
}

export default connect(
  null,
  { handleModal: pushNewTopic }
)(NewSubjectButton);
