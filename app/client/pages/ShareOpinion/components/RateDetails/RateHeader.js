import React from 'react';

export default function RateHeader({ profile }) {
  if (!profile) {
    return null;
  }

  const { id, type, title } = profile;
  const link = `${id}_${type}`;

  return (
    <div className="rate-details selected-profile">
      <div className="selected-profile__title">{title}</div>
      <a href={link} className="selected-profile__link">
        View Profile
      </a>
    </div>
  );
}
