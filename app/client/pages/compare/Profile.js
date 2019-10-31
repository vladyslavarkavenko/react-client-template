import React from 'react';

import MarkerSVG from '../../../../public/assets/svg/map-marker.svg';
import { RATE_PROFILE_TYPE } from '../../utils/constants';

const { MANAGER } = RATE_PROFILE_TYPE;

const Profile = ({ avatar, name, location, avgSatisfaction, type }) => (
  <div className="profile-block">
    <img className={`avatar ${type === MANAGER ? 'circle' : ''}`} src={avatar} alt="avatar" />
    <p className="name">{name}</p>
    <div className="location flex-center">
      <MarkerSVG />
      <p>{location}</p>
    </div>
    <p className="satisfaction">{avgSatisfaction}% clients satisfied with the bank</p>
  </div>
);

export default Profile;
