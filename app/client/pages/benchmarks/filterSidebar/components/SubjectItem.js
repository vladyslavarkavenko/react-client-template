import React from 'react';

import ArrowSvg from '../../../../../../public/assets/svg/arrow-down.svg';
import CheckboxInput from '../../../../components/ui-components/Form/CheckboxInput';

export default function SubjectItem() {
  return (
    <li className="subject__item active">
      <button type="button" className="head">
        <span className="label">Mortage</span>

        <div className="controls">
          <span className="count">3</span>
          <ArrowSvg />
        </div>
      </button>

      <ul className="topic__list">
        <li className="topic__item">
          <CheckboxInput withFill labelText="Good performance" />
        </li>

        <li className="topic__item">
          <CheckboxInput withFill labelText="Low commissions" checked />
        </li>

        <li className="topic__item">
          <CheckboxInput withFill labelText="Low fees" />
        </li>
      </ul>
    </li>
  );
}
