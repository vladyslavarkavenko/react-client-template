import React from 'react';
import ExclamationCircleEmptySvg from '../../../../../public/assets/svg/exclamation-circle-transperent.svg';

export default function RateListItem({ isActive, withAlert }) {
  return (
    <li className={`rate-list__item ${isActive ? 'active' : ''}`}>
      {isActive && <span className="company-label" />}
      <div className="company-img">
        <img src={`https://picsum.photos/300/300?544${Math.random()}`} alt="" />
      </div>
      <div className="company-info">
        <div className="company-title">Basler Kantonanal</div>
        <div className="company-subtitle">89% clients satisfied with the bank</div>
        {withAlert && (
          <span className="company-alert">
            <ExclamationCircleEmptySvg />
          </span>
        )}
      </div>
    </li>
  );
}
