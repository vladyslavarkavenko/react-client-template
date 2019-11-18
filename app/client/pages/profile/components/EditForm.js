import React from 'react';

import Button from './Button';
import { BTN_TYPES } from '../../../utils/constants';
import TextInput from '../../../components/ui-components/Form/TextInput';

import UnhappySvg from '../../../../../public/assets/svg/emoji/1_5.svg';
import NeutralSvg from '../../../../../public/assets/svg/emoji/5_6.svg';
import SatisfiedSvg from '../../../../../public/assets/svg/emoji/7_1.svg';

const { BLUE } = BTN_TYPES;

const SatisfactionButton = (props) => {
  const { sKey, active, onChange } = props;

  const onClick = (e) => {
    e.preventDefault();
    onChange({ target: { value: sKey, name: 'satisfaction' } });
  };

  let svg;
  let title;
  switch (sKey) {
    case 1:
      svg = <UnhappySvg />;
      title = 'Unhappy';
      break;
    case 2:
      svg = <NeutralSvg />;
      title = 'Neutral';
      break;
    case 3:
      svg = <SatisfiedSvg />;
      title = 'Satisfied';
      break;
    default:
      break;
  }

  return (
    <button className={`satisfaction-btn ${active ? 'active' : ''}`} onClick={onClick}>
      {svg}
      {title}
    </button>
  );
};

const EditForm = ({ inputs, onChange, cancelChanges, saveChanges, errors, satisfaction }) => (
  <form className="content-edit-info">
    {inputs.map(({ name, value, labelText, className }) => {
      return (
        <TextInput
          key={name}
          name={name}
          labelText={labelText || name.charAt(0).toUpperCase() + name.slice(1)}
          value={value}
          onChange={onChange}
          error={errors[name]}
          className={className}
        />
      );
    })}
    {satisfaction && (
      <div className="satisfaction-block">
        <p>My overall satisfaction level</p>
        <div className="btns">
          <SatisfactionButton onChange={onChange} sKey={1} active={satisfaction === 1} />
          <SatisfactionButton onChange={onChange} sKey={2} active={satisfaction === 2} />
          <SatisfactionButton onChange={onChange} sKey={3} active={satisfaction === 3} />
        </div>
      </div>
    )}
    <div className="buttons">
      <Button title="Cancel" onClick={cancelChanges} />
      <Button title="Save changes" type={BLUE} onClick={saveChanges} />
    </div>
  </form>
);

export default EditForm;
