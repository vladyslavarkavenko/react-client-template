import React from 'react';

export default function SelectedAccountHeader({ title, link }) {
  return (
    <div className="rate-details selected-profile">
      <div className="selected-profile__title">{title}</div>
      <a href={link} className="selected-profile__link">
        View Profile
      </a>
    </div>
  );
}
