import React from 'react';
import SuccessCircleSvg from '../../../../../../public/assets/svg/check-circle.svg';
import ExclamationCircleEmptySvg from '../../../../../../public/assets/svg/exclamation-circle-empty.svg';
import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';

export default function TopicItem({
  checkboxId,
  data,
  expiredTopics,
  selectedTopicsId,
  handleSelect
}) {
  const { name, id, dateLastOption } = data;

  const isChecked = selectedTopicsId.includes(id);
  const isExpired = Array.isArray(expiredTopics) && expiredTopics.includes(id);
  const isFilled = !isExpired && dateLastOption;

  return (
    <li className="topic">
      <CheckboxInput
        name={checkboxId}
        labelText={name}
        className="topic-checkbox"
        onChange={() => handleSelect(data)}
        checked={isChecked}
      />

      {isExpired && (
        <span className="topic-status red">
          <ExclamationCircleEmptySvg />
        </span>
      )}

      {isFilled && (
        <span className="topic-status green">
          <SuccessCircleSvg />
        </span>
      )}
    </li>
  );
}
