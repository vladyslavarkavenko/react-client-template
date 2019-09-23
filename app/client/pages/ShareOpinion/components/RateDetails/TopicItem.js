import React from 'react';
import ExclamationCircleEmptySvg from '../../../../../../public/assets/svg/exclamation-circle-empty.svg';
import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';

export default function TopicItem({ title, withAlert, key }) {
  return (
    <li className="topic">
      <CheckboxInput name={key} labelText={title} className="topic-checkbox" />
      {withAlert && (
        <span className="topic-status">
          <ExclamationCircleEmptySvg />
        </span>
      )}
    </li>
  );
}
