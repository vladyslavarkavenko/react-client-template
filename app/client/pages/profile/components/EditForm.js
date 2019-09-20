import React from 'react';

import Button from './Button';
import { BTN_TYPES } from '../../../utils/constants';
import CustomInput from '../../../components/ui-components/CustomInput';

const { BLUE } = BTN_TYPES;

const EditForm = ({ inputs, onChange, reset, save, errors }) => (
  <form className="content-edit-info">
    {inputs.map(({ name, value }) => {
      const labelText = name.charAt(0).toUpperCase() + name.slice(1);

      return (
        <CustomInput
          key={name}
          name={name}
          labelText={labelText}
          value={value}
          onChange={onChange}
          error={errors[name]}
        />
      );
    })}
    <div className="buttons">
      <Button title="Cancel" onClick={reset} />
      <Button title="Save changes" type={BLUE} onClick={save} />
    </div>
  </form>
);

export default EditForm;
