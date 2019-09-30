import React from 'react';
import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';
import Notification from '../../../../utils/notifications';
import FileSvg from '../../../../../../public/assets/svg/file-medical.light.svg';
import TimesSvg from '../../../../../../public/assets/svg/times.svg';
import { FILE_MIMES, FILE_SIZES } from '../../../../utils/constants';

const { DOCUMENTS, IMAGES, ARCHIVES } = FILE_MIMES;

/* eslint-disable */
export default class RateComment extends React.Component {
  constructor(props) {
    super(props);

    this.maxSize = FILE_SIZES.DEFAULT;
    this.allowedMimes = [...DOCUMENTS, ...IMAGES, ...ARCHIVES];

    this.handleCheck = this.handleCheck.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
  }

  handleCheck() {
    const { handleCheck, topic } = this.props;
    handleCheck(topic.id);
  }

  handleChangeText({ currentTarget }) {
    const { handleChangeText, topic } = this.props;
    handleChangeText({ id: topic.id, value: currentTarget.value });
  }

  handleChangeFile({ currentTarget }) {
    const { handleChangeFile, topic } = this.props;
    const file = currentTarget.files[0];

    if (!this.allowedMimes.includes(file.type)) {
      Notification.error('This type of file is not allowed');
      return;
    }

    if (file.size > this.maxSize) {
      Notification.error(`File ${file.name} is bigger than 7mb`);
      return;
    }

    handleChangeFile({ file: file, fileName: file.name, id: topic.id });
  }

  handleDeleteFile(e) {
    e.preventDefault();
    const { handleChangeFile, topic } = this.props;
    handleChangeFile({ isDelete: true, id: topic.id });
  }

  render() {
    const { topic, file, disabled } = this.props;

    const { name, comment, isChecked } = topic;

    const checkBoxKey = `${topic.id}_c`;
    const fileKey = `${topic.id}_f`;

    return (
      <div className="">
        <CheckboxInput
          className="opinion-form__check"
          name={checkBoxKey}
          labelText={name}
          checked={isChecked}
          onClick={this.handleCheck}
          disabled={disabled}
        />

        {isChecked && (
          <>
            <div className="opinion-form__fields">
              <p className="opinion-form__subtitle">Your comment</p>
              {file && <span className="file-name">{file.name}</span>}
              <label htmlFor={fileKey} className={`file-upload ${file ? 'filled' : ''}`}>
                {file ? <TimesSvg /> : <FileSvg />}

                <input
                  id={fileKey}
                  className="hidden"
                  type="file"
                  disabled={disabled}
                  onClick={file ? this.handleDeleteFile : null}
                  onChange={file ? null : this.handleChangeFile}
                />
              </label>
            </div>

            <textarea
              disabled={disabled}
              defaultValue={comment}
              maxLength={450}
              onBlur={this.handleChangeText}
              className="opinion-form__text"
              placeholder={`Please, describe your situation, action.\nWhat were the consequences?\nShare all your opinion about the situation.`}
            ></textarea>
          </>
        )}
      </div>
    );
  }
}
