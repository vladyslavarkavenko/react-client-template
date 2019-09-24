import React from 'react';
import ModalWrapper from '../../../../components/ui-components/Modal/ModalWrapper';
import ModalWhiteButton from '../../../../components/ui-components/Modal/ModalWhiteButton';
import ModalThemeButton from '../../../../components/ui-components/Modal/ModalThemeButton';
import TextInput from '../../../../components/ui-components/Form/TextInput';

/* eslint-disable */
export default class CreateTopicModal extends React.Component {
  render() {
    const { handleModal } = this.props;
    return (
      <ModalWrapper
        title="Add new topic to Morgages"
        subtitle="Describe the need on which you want to Share your opinion"
        handleModal={handleModal}
      >
        <div className="m-create-subject">
          <div className="input-group">
            <TextInput labelText="Formulate Subject">
              {/*<select>*/}
              {/*  <option>1</option>*/}
              {/*  <option>2</option>*/}
              {/*  <option>3</option>*/}
              {/*</select>*/}
            </TextInput>
            <TextInput labelText="Formulate Topic" />
          </div>
        </div>
        <div className="m-btn-list">
          <ModalWhiteButton onClick={handleModal}>Cancel</ModalWhiteButton>
          <ModalThemeButton>Add</ModalThemeButton>
        </div>
      </ModalWrapper>
    );
  }
}
