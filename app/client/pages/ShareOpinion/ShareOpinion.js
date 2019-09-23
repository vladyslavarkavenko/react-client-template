import React from 'react';
import EclamationCircleSvg from '../../../../public/assets/svg/exclamation-circle.svg';
import ListArrowDownSvg from '../../../../public/assets/svg/arrow-down.svg';
import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';

export default function Profile() {
  return (
    <div className="content share-opinion">
      <SimpleContentHeader title="Share your opinion" />
      <div className="content-body">
        <ul className="evaluate-list">
          <li className="evaluate-list__heading">My companies</li>
          <li className="evaluate-list__item">Privatbank</li>
          <li className="evaluate-list__item">Monobank</li>

          <li className="evaluate-list__heading">My managers</li>
          <li className="evaluate-list__item">Rene Meier</li>
        </ul>
        <div className="evaluate-details">
          <div className="evaluate-details selected-profile">
            <div className="selected-profile__title">Rene Meier</div>
            <div className="selected-profile__link">View Profile</div>
          </div>
          <ul className="details-list">
            <li className="details-list__btn">
              <button className="add-new">+ Add new</button>
            </li>

            <li className="details-list__notify">
              <span className="notify-label" />
              <span className="notify-icon">
                <EclamationCircleSvg />
              </span>
              <span className="notify-message">Some of your feedbacks has lost its impact</span>
              <button className="notify-btn">Update now</button>
            </li>

            <li className="details-list__subject activ1e">
              <span className="subject-arrow">
                <ListArrowDownSvg />
              </span>
              <div className="subject-main">
                <div className="subject-img">
                  <img src="https://picsum.photos/300/300" alt="" />
                </div>

                <div className="subject-info">
                  <div className="subject-title">
                    Banker
                    <span>{/*<EclamationCircleSvg />*/}</span>
                  </div>
                  <div className="subject-count">7 of 25</div>
                  <div className="subject-progress-bar">
                    <div className="fill-bar" style={{ width: '30%' }} />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
