import React from 'react';
import i18next from 'i18next';

import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';
import Notification from '../../../../utils/notifications';
import FileSvg from '../../../../../../public/assets/svg/file-medical.light.svg';
import TimesSvg from '../../../../../../public/assets/svg/times.svg';
import { FILE_MIMES, FILE_SIZES } from '../../../../utils/constants';

const { DOCUMENTS, IMAGES, ARCHIVES } = FILE_MIMES;

export default class SharedComment extends React.Component {
  constructor(props) {
    super(props);

    this.checkId = -1;

    this.maxSize = FILE_SIZES.DEFAULT;
    this.allowedMimes = [...DOCUMENTS, ...IMAGES, ...ARCHIVES];

    this.handleCheck = this.handleCheck.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
  }

  handleCheck() {
    const { handleCheck } = this.props;
    handleCheck();
  }

  handleChangeText({ currentTarget }) {
    const { handleChangeText } = this.props;
    handleChangeText(currentTarget.value);
  }

  handleChangeFile({ currentTarget }) {
    const { handleChangeFile } = this.props;
    const file = currentTarget.files[0];

    if (!this.allowedMimes.includes(file.type)) {
      Notification.error(i18next.t('validation.file.invalid'));
      return;
    }

    if (file.size > this.maxSize) {
      Notification.error(i18next.t('validation.file.size', { name: file.name, maxSize: '7mb' }));
      return;
    }

    handleChangeFile({ file, fileName: file.name, id: this.checkId });
  }

  handleDeleteFile(e) {
    e.preventDefault();
    const { handleChangeFile } = this.props;
    handleChangeFile({ isDelete: true, id: this.checkId });
  }

  render() {
    const { file, disabled, isChecked, comment } = this.props;

    const checkBoxKey = `select_all_c`;
    const fileKey = `select_all_f`;

    return (
      <>
        <CheckboxInput
          className="opinion-form__check"
          name={checkBoxKey}
          labelText="Select all"
          onChange={this.handleCheck}
          disabled={disabled}
        />

        {isChecked && (
          <>
            <div className="opinion-form__fields">
              <p className="opinion-form__subtitle">{i18next.t('shareOpinion.yourComment')}</p>
              {file && <span className="file-name">{file.fileName}</span>}
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
              placeholder={i18next.t('shareOpinion.commentPlaceholder')}
            />
          </>
        )}
      </>
    );
  }
}
