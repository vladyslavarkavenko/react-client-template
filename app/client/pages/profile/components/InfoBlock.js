/* eslint-disable no-nested-ternary */
import React from 'react';

import EditIcon from './infoBlock/EditIcon';
import SaveIcon from './infoBlock/SaveIcon';
import CancelIcon from './infoBlock/CancelIcon';
import CustomTextarea from '../../../components/ui-components/CustomTextarea';

class InfoBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlockEditing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isEdit) {
      this.setState({ isBlockEditing: false });
    }
  }

  onSaveClick() {
    const { saveChanges } = this.props;

    saveChanges(this.toggleEdit);
  }

  onCancelClick() {
    const { cancelChanges } = this.props;

    cancelChanges();
    this.toggleEdit();
  }

  toggleEdit() {
    this.setState((state) => ({
      isBlockEditing: !state.isBlockEditing
    }));
  }

  render() {
    const { isBlockEditing } = this.state;
    const { title, body, name, isEdit, onChange, errors, className } = this.props;

    let Title;
    switch (typeof title) {
      case 'string':
        Title = <h2 className="info-block__title">{title}</h2>;
        break;
      case 'function':
        Title = title();
        break;
      default:
        Title = title;
        break;
    }

    let Body;
    switch (typeof body) {
      case 'string':
        if (isBlockEditing) {
          const error = errors[name];
          Body = <CustomTextarea name={name} value={body} onChange={onChange} error={error} />;
        } else {
          Body = <p>{body || '—'}</p>;
        }
        break;
      case 'function':
        Body = body(isBlockEditing);
        break;
      default:
        Body = body;
        break;
    }

    if (isBlockEditing) {
      return (
        <div className={`info-block ${className || ''}`}>
          <CancelIcon onClick={this.onCancelClick} />
          <SaveIcon onClick={this.onSaveClick} />
          {Title}
          {Body}
        </div>
      );
    }

    return (
      <div className={`info-block ${className || ''}`}>
        {isEdit && <EditIcon onClick={this.toggleEdit} />}
        {Title}
        {Body}
      </div>
    );
  }
}

export default InfoBlock;
