import React from 'react';
import ExclamationCircleSvg from '../../../../../public/assets/svg/exclamation-circle.svg';

export default function RateNotification() {
  return (
    <li className="details-list__notify">
      <span className="notify-label" />
      <span className="notify-icon">
        <ExclamationCircleSvg />
      </span>
      <span className="notify-message">Some of your feedbacks has lost its impact</span>
      <button type="button" className="notify-btn">
        Update now
      </button>
    </li>
  );
}
