/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import { HEADER_ICONS, BTN_TYPES } from '../../../utils/constants';

import SvgMapMarker from '../../../../../public/assets/svg/map-marker.svg';

const { PEN, CAMERA, DELETE } = HEADER_ICONS;
const { TRANSPARENT } = BTN_TYPES;

// TODO: Add loading when updating.
// TODO: Add validation for image.
class ContentHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onEditBtnClick = this.onEditBtnClick.bind(this);
  }

  onEditBtnClick() {
    const { history, toggleEditMode } = this.props;

    toggleEditMode();
    history.push('/account/profile/about');
  }

  render() {
    const {
      displayAvatar = false,
      avatar,
      loc,
      title,
      subTitle,
      editForm,
      navLinks,
      isEdit,
      onChange,
      customButtons
    } = this.props;

    return (
      <div className="content-header">
        {displayAvatar && (
          <div className="avatar-wrapper">
            <div className="avatar circle">
              <img alt="Avatar" src={avatar || '/assets/img/empty-avatar.jpg'} />
            </div>
          </div>
        )}
        <div className="info">
          {isEdit ? (
            <div className="buttons">
              <>
                <Button htmlFor="avatar" icon={CAMERA} title="Edit photo" type={TRANSPARENT} />
                <input
                  id="avatar"
                  type="file"
                  className="hidden"
                  name="avatar"
                  onChange={onChange}
                />
              </>
              <Button
                icon={DELETE}
                title="Delete"
                type={TRANSPARENT}
                onClick={() => onChange({ target: { name: 'avatar' } })}
              />
            </div>
          ) : (
            <div className="text-block">
              {title && <h1>{title}</h1>}
              {subTitle && <h2>{subTitle}</h2>}
              {loc && (
                <div className="location">
                  <SvgMapMarker />
                  <p>{loc}</p>
                </div>
              )}
            </div>
          )}

          {customButtons && <div className="buttons-block">{customButtons}</div>}
        </div>
        {editForm && !isEdit && (
          <Button
            icon={PEN}
            title="Edit"
            onClick={this.onEditBtnClick}
            className="edit-btn"
            type={TRANSPARENT}
          />
        )}

        {isEdit && editForm}
        {navLinks && (
          <ul className="content-nav-bar">
            {navLinks.map(({ to, title }) => (
              <li key={to}>
                <NavLink to={to} activeClassName="active" exact>
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
