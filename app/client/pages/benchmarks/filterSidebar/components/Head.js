import React from 'react';
import TimesSvg from '../../../../../../public/assets/svg/times.svg';

export default function Head({ handleModal }) {
  return (
    <div className="filter-sidebar__head">
      <p className="title">
        Filters
        <span className="close-btn" onClick={() => handleModal()}>
          <TimesSvg />
        </span>
      </p>

      <ul className="selected-filters__list">
        <li className="selected-filters__item">
          <span className="label">Good performance</span>
          <button type="button" className="delete-btn">
            <TimesSvg />
          </button>
        </li>

        <li className="selected-filters__item">
          <span className="label">Safe</span>
          <button type="button" className="delete-btn">
            <TimesSvg />
          </button>
        </li>

        <li className="selected-filters__item">
          <span className="label">Exclusive</span>
          <button type="button" className="delete-btn">
            <TimesSvg />
          </button>
        </li>
      </ul>
    </div>
  );
}
