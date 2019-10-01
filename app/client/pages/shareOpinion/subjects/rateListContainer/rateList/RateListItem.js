import React from 'react';
import { RATE_PROFILE_TYPE } from '../../../../../utils/constants';
import ExclamationCircleEmptySvg from '../../../../../../../public/assets/svg/exclamation-circle.svg';

const { MANAGER, COMPANY } = RATE_PROFILE_TYPE;

export default function RateListItem({ data = {}, selected, withAlert, isCompany, handleSelect }) {
  const { avatar, name, firstName, lastName, id } = data;

  const type = isCompany ? COMPANY : MANAGER;

  const isActive = selected && selected.type === type && selected.id === id;

  return (
    <li
      className={`rate-list__item ${isActive ? 'active' : ''}`}
      key={isCompany ? `${id}_c` : `${id}_m`}
      onClick={!isActive ? () => handleSelect({ data, type }) : null}
    >
      {isActive && <span className="company-label" />}
      <div className="company-img">
        <img src={avatar} alt="" />
      </div>
      <div className="company-info">
        <div className="company-title">{isCompany ? name : `${firstName} ${lastName}`}</div>
        <div className="company-subtitle">
          {isCompany
            ? `93% clients satisfied with the bank`
            : `75% clients satisfied with this manager`}
        </div>
        {withAlert && (
          <span className="company-alert">
            <ExclamationCircleEmptySvg />
          </span>
        )}
      </div>
    </li>
  );
}
