import React from 'react';
import ExclamationCircleEmptySvg from '../../../../../../public/assets/svg/exclamation-circle-empty.svg';
import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';

export default function TopicItem({ chekboxId, data, selectedTopicsId, handleSelect, withAlert }) {
  const { name, id } = data;

  const isChecked = selectedTopicsId.includes(id);

  return (
    <li className="topic">
      <CheckboxInput
        name={chekboxId}
        labelText={name}
        className="topic-checkbox"
        onChange={() => handleSelect(data)}
        checked={isChecked}
      />
      {withAlert && (
        <span className="topic-status">
          <ExclamationCircleEmptySvg />
        </span>
      )}
    </li>
  );
}
