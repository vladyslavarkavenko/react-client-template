import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';

import ModalWrapper from '../../../../../components/ui-components/Modal/ModalWrapper';
import ModalWhiteButton from '../../../../../components/ui-components/Modal/ModalWhiteButton';
import ModalThemeButton from '../../../../../components/ui-components/Modal/ModalThemeButton';
import TextInput from '../../../../../components/ui-components/Form/TextInput';
import shareOpinionSelectors from '../../../../../modules/shareOpinion/shareOpinionSelectors';
import {
  pushNewTopic,
  saveNewTopicField,
  selectSubjectForNewTopic
} from '../../../../../modules/shareOpinion/shareOpinionActions';
import SubjectHintsDropdown from './createTopicModal/SubjectHintsDropdown';

function CreateTopicModal({
  handleModal,
  selectSubject,
  save,
  input,
  errors,
  selected,
  status,
  createNewTopic,
  hints
}) {
  const isSubjectSelected = Boolean(selected);

  const isRequest = status === 'request';

  return (
    <ModalWrapper
      title={i18next.t('shareOpinion.modal.title')}
      subtitle={i18next.t('shareOpinion.modal.subtitle')}
      handleModal={() => handleModal()}
    >
      <div className="m-create-subject">
        <div className="input-group">
          <TextInput
            labelText={
              isSubjectSelected
                ? i18next.t('shareOpinion.modal.selectedSubject')
                : i18next.t('shareOpinion.modal.formulateSubject')
            }
            name="subject"
            onChange={({ currentTarget }) => save({ type: 'subject', value: currentTarget.value })}
            value={input.subject}
            error={errors.subject}
            readOnly={isSubjectSelected || isRequest}
            autoComplete="off"
          >
            <SubjectHintsDropdown
              hints={hints}
              disabled={isSubjectSelected || isRequest}
              save={selectSubject}
              autoComplete="off"
            />
          </TextInput>
          <TextInput
            labelText="Formulate Topic"
            name="topic"
            onChange={({ currentTarget }) => save({ type: 'topic', value: currentTarget.value })}
            value={input.topic}
            error={errors.topic}
            readOnly={isRequest}
          />
        </div>
      </div>
      <div className="m-btn-list">
        <ModalWhiteButton onClick={() => handleModal()} disabled={isRequest}>
          {i18next.t('shareOpinion.buttons.cancel')}
        </ModalWhiteButton>
        <ModalThemeButton onClick={() => createNewTopic()} disabled={isRequest}>
          {i18next.t('shareOpinion.buttons.add')}
        </ModalThemeButton>
      </div>
    </ModalWrapper>
  );
}

const mapStateToProps = (state) => ({
  input: shareOpinionSelectors.newTopicInput(state),
  errors: shareOpinionSelectors.newTopicErrors(state),
  status: shareOpinionSelectors.newTopicStatus(state),
  selected: shareOpinionSelectors.newTopicSelected(state),
  hints: shareOpinionSelectors.newTopicHints(state)
});

// close modal and clear state;
const handleModal = pushNewTopic.fulfill;
const createNewTopic = pushNewTopic.request;

const mapDispatchToProps = {
  selectSubject: selectSubjectForNewTopic,
  save: saveNewTopicField,

  handleModal,
  createNewTopic,
  pushNewTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTopicModal);
