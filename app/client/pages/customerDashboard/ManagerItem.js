import React from 'react';
import { Link } from 'react-router-dom';

// import MapMarker from '../../../../public/assets/svg/map-marker.svg';
import { ROUTING_PARAMS } from '../../utils/constants';
import routing from '../../utils/routing';

export default function ManagerItem({ manager }) {
  const { id, avgSatisfaction, firstName, lastName, avatar } = manager;
  return (
    <li className="profile__item manager">
      <div className="profile__content">
        <div className="profile__avatar">
          <img src={avatar || '/assets/img/empty-avatar.jpg'} alt="avatar" />
        </div>
        <Link to={routing(id).managerProfileOverview} className="title">
          {firstName} {lastName}
        </Link>
        <span className="location">
          {/*<MapMarker />*/}
          {/*Zurich, Switzerland*/}
        </span>
        <span className="satisfaction">{avgSatisfaction}% clients satisfied with the manager</span>
      </div>
      <div className="profile__btns">
        <Link
          to={
            routing({
              type: ROUTING_PARAMS.MANAGER,
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
