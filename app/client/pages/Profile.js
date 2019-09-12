import React from 'react';
import { connect } from 'react-redux';

import AuthGuard from '../components/HOCs/AuthGuard';
import RolesManager from '../components/HOCs/RolesManager';
import { ROLES } from '../constants';

import SvgMapMarker from '../../../public/assets/svg/map-marker.svg';
import SvgPen from '../../../public/assets/svg/pen.svg';

function formatPhoneNumber(number) {
  const match = number.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
}

const {
  CUSTOMER, ADMIN,
} = ROLES;
// eslint-disable-next-line react/prefer-stateless-function
class Profile extends React.Component {
  render() {
    const {
      user: {
        email,
        firstName,
        lastName,
        phone,
        avatar,
        about,
        location,
        title,
      },
      activeRole,
    } = this.props;

    // eslint-disable-next-line no-nested-ternary
    const profileTitle = activeRole === ADMIN
      ? '89% satisfied clients'
      : activeRole === CUSTOMER
        ? 'I\'m satisfied'
        : title;

    const aboutTitle = activeRole === CUSTOMER ? 'Biography' : 'Portrait';
    const name = `${firstName} ${lastName}`;

    return (
      <div className="content">
        <div className="content-header">
          <div className="avatar">
            <div className="img-wrapper">
              <img src={avatar || 'assets/img/empty-avatar.jpg'} alt="Avatar" />
            </div>
          </div>
          <div className="info">
            <h1>{name}</h1>
            <h2>{profileTitle}</h2>
            {
              activeRole !== ADMIN
              && (
              <div className="location">
                <SvgMapMarker />
                <p>
                  {location}
                </p>
              </div>
              )
            }
          </div>
          <div className="buttons">
            <button className="edit-btn">
              <SvgPen />
              Edit
            </button>
          </div>
          <ul className="content-nav-bar">
            <li>Overview</li>
            <li className="active">About</li>
          </ul>
        </div>
        <div className="content-body">
          <div className="main">
            <div className="info-block">
              <h1>
                {aboutTitle}
              </h1>
              <p>
                {about}
              </p>
            </div>
          </div>
          <div className="sidebar">
            <div className="info-block">
              <h1> Contacts </h1>
              <div className="info-line">
                <p> Phone </p>
                <a href={`tel:${phone}`}>
                  {formatPhoneNumber(phone)}
                </a>
              </div>
              {
                activeRole === ADMIN
                && (
                  <div className="info-line">
                    <p> Web </p>
                    <a href="abc@example.com">abc@example.com</a>
                  </div>
                )
              }
              <div className="info-line">
                <p> Mail </p>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  activeRole: state.auth.activeRole,
});

export default AuthGuard(RolesManager(connect(mapStateToProps)(Profile)));
