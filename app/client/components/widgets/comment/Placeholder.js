import React from 'react';

import MessageSvg from '../../../../../public/assets/svg/comment-alt-lines.duotone.svg';

export default function Placeholder() {
  return (
    <li className="placeholder">
      <div className="placeholder__wrap">
        <div className="placeholder__icon">
          <MessageSvg />
        </div>
        <div className="placeholder__title">No Comments Yet</div>
      </div>
    </li>
  );
}
