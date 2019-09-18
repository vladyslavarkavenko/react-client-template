import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import { HEADER_ICONS, BTN_TYPES } from '../../../constants';

import SvgMapMarker from '../../../../../public/assets/svg/map-marker.svg';

const { PEN, CAMERA, DELETE } = HEADER_ICONS;
const { TRANSPARENT } = BTN_TYPES;

// eslint-disable-next-line react/prefer-stateless-function
class ContentHeader extends React.Component {
  render() {
    const {
      displayAvatar = false,
      avatar,
      location,
      title,
      subTitle,
      editForm,
      navLinks,
      editMode,
      toggleEditMode,
      onAvatarChange
    } = this.props;

    return (
      <div className="content-header">
        {displayAvatar && (
          <div className="avatar">
            <div className="img-wrapper">
              <img alt="Avatar" src={avatar || '/assets/img/empty-avatar.jpg'} />
            </div>
          </div>
        )}
        <div className="info">
          {editMode ? (
            <div className="buttons">
              <>
                <Button htmlFor="avatar" icon={CAMERA} title="Edit photo" type={TRANSPARENT} />
                <input
                  id="avatar"
                  type="file"
                  className="hidden"
                  name="avatar"
                  onChange={onAvatarChange}
                />
              </>
              <Button
                icon={DELETE}
                title="Delete"
                type={TRANSPARENT}
                onClick={() => onAvatarChange({ target: { name: 'avatar' } })}
              />
            </div>
          ) : (
            <>
              {title && <h1>{title}</h1>}
              {subTitle && <h2>{subTitle}</h2>}
              {location && (
                <div className="location">
                  <SvgMapMarker />
                  <p>{location}</p>
                </div>
              )}
            </>
          )}
        </div>
        {editForm && !editMode && (
          <Button
            icon={PEN}
            title="Edit"
            onClick={toggleEditMode}
            className="edit-btn"
            type={TRANSPARENT}
          />
        )}
        {editMode && editForm}
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
  }
}

export default ContentHeader;
