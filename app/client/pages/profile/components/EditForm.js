import React from 'react';

import Button from './Button';
import { BTN_TYPES } from '../../../constants';
import CustomInput from '../../../components/ui-components/CustomInput';

const { BLUE } = BTN_TYPES;

const EditForm = ({ inputs, onCancel, onSubmit }) => (
  <form className="content-edit-info">
    {inputs.map(({ name, value, onChange }) => {
      const labelText = name.charAt(0).toUpperCase() + name.slice(1);

      return (
        <CustomInput
          key={name}
          name={name}
          labelText={labelText}
          value={value}
          onChange={onChange}
        />
      );
    })}
    <div className="buttons">
      <Button title="Cancel" onClick={onCancel} />
      <Button title="Save changes" type={BLUE} onClick={onSubmit} />
    </div>
  </form>
);

export default EditForm;
