import React from 'react';

import ArrowUp from '../../../../../public/assets/svg/arrow-up.regular.svg';

export default function StaffRow({ data }) {
  const { id, avatar, name, title, rating, avgSatisfaction, statistics } = data;
  return (
    <tr key={id}>
      <td className="d-flex ai-center">
        <div className="avatar circle">
          <img src={avatar} alt="Avatar" />
        </div>
        <div>
          <div className="name">{name}</div>
          <div className="title"> {title} </div>
        </div>
      </td>
      <td>{rating}</td>
      <td>{avgSatisfaction}%</td>
      <td className="statistics">
        {statistics === 0 && (
          <div className="satisfaction-diff green">
            0%
            <ArrowUp />
          </div>
        )}

        {statistics > 0 && (
          <div className="satisfaction-diff green">
            +{statistics}%
            <ArrowUp />
          </div>
        )}

        {statistics < 0 && (
          <div className="satisfaction-diff red">
            {statistics}%
            <ArrowUp />
          </div>
        )}
      </td>
    </tr>
  );
}
