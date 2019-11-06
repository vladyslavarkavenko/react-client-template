import React from 'react';
import { Link } from 'react-router-dom';

import MapMarker from '../../../../public/assets/svg/map-marker.svg';
import { ROUTING_PARAMS } from '../../utils/constants';
import GradeCircle from '../../components/ui-components/GradeCircle';
import routing from '../../utils/routing';

export default function CompanyItem({ company }) {
  const { avatar, location, name, avgSatisfaction, id, ctruScore } = company;
  return (
    <li className="profile__item company">
      <div className="profile__content">
        <div className="profile__avatar">
          <GradeCircle score={ctruScore} />
          <img src={avatar || '/assets/img/empty-avatar.jpg'} alt="avatar" />
        </div>
        <Link to={routing(id).companyProfileOverview} className="title">
          {name}
        </Link>
        <span className="location">
          {location && (
            <>
              <MapMarker />
              {location}
            </>
          )}
        </span>
        <span className="satisfaction">{avgSatisfaction}% clients satisfied with the company</span>
      </div>
      <div className="profile__btns">
        <Link
          to={
            routing({
              type: ROUTING_PARAMS.COMPANY,
              id
            }).shareOpinionWithProfile
          }
          className="component btn-default"
        >
          Share your opinion
        </Link>
      </div>
    </li>
  );
}
