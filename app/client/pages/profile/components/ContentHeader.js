import React from 'react';
import { NavLink } from 'react-router-dom';

import SvgMapMarker from '../../../../../public/assets/svg/map-marker.svg';

const ContentHeader = ({
  displayAvatar = false,
  avatar,
  location,
  title,
  subTitle,
  renderButtons,
  navLinks
}) => (
  <div className="content-header">
    {displayAvatar && (
      <div className="avatar">
        <div className="img-wrapper">
          <img alt="Avatar" src={avatar || 'assets/img/empty-avatar.jpg'} />
        </div>
      </div>
    )}
    <div className="info">
      {title && <h1>{title}</h1>}
      {subTitle && <h2>{subTitle}</h2>}
      {location && (
        <div className="location">
          <SvgMapMarker />
          <p>{location}</p>
        </div>
      )}
    </div>
    {renderButtons && <div className="buttons">{renderButtons()}</div>}
    {navLinks && (
      <ul className="content-nav-bar">
        {navLinks.map(({ to, title }) => (
          <li key={to}>
            <NavLink to={to} activeClassName="active">
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ContentHeader;
