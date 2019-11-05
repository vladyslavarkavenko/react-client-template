import React from 'react';
import { Link } from 'react-router-dom';

import MapMarker from '../../../../public/assets/svg/map-marker.svg';
import routing from '../../utils/routing';
import GradeCircle from '../../components/ui-components/GradeCircle';

export default function ProfileList() {
  return (
    <ul className="profile__list">
      <li className="profile__item company">
        <div className="profile__content">
          <div className="profile__avatar">
            <GradeCircle score="7.5" />
            <img src="/assets/img/empty-avatar.jpg" alt="avatar" />
          </div>
          <span className="title">Basler Kantonalbank</span>
          <span className="location">
            <MapMarker />
            Zurich, Switzerland
          </span>
          <span className="satisfaction">89% clients satisfied with the bank</span>
        </div>
        <div className="profile__btns">
          <Link to={routing().shareOpinion} className="component btn-default">
            Share your opinion
          </Link>
        </div>
      </li>

      <li className="profile__item manager">
        <div className="profile__content">
          <div className="profile__avatar">
            <img src="/assets/img/empty-avatar.jpg" alt="avatar" />
          </div>
          <span className="title">Basler Kantonalbank</span>
          <span className="location">
            <MapMarker />
            Zurich, Switzerland
          </span>
          <span className="satisfaction">89% clients satisfied with the bank</span>
        </div>
        <div className="profile__btns">
          <Link to={routing().shareOpinion} className="component btn-default">
            Share your opinion
          </Link>
        </div>
      </li>

      <li className="profile__item company">
        <div className="profile__content">
          <div className="profile__avatar">
            <img src="/assets/img/empty-avatar.jpg" alt="avatar" />
          </div>
          <span className="title">Basler Kantonalbank</span>
          <span className="location">
            <MapMarker />
            Zurich, Switzerland
          </span>
          <span className="satisfaction">89% clients satisfied with the bank</span>
        </div>
        <div className="profile__btns">
          <Link to={routing().shareOpinion} className="component btn-default">
            Share your opinion
          </Link>
        </div>
      </li>
    </ul>
  );
}
