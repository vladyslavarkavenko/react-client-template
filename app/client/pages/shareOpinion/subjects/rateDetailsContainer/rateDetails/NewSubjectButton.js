import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { pushNewTopic } from '../../../../../modules/shareOpinion/shareOpinionActions';

function NewSubjectButton({ handleModal }) {
  return (
    <li className="details-list__btn">
      <button type="button" className="add-new-btn" onClick={() => handleModal()}>
        {i18next.t('shareOpinion.buttons.addNewSubject')}
      </button>
    </li>
  );
}

export default connect(
  null,
  { handleModal: pushNewTopic }
)(NewSubjectButton);
