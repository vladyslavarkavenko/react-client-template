import React from 'react';
import i18next from 'i18next';

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
        {i18next.t('shareOpinion.profile')}
      </a>
    </div>
  );
}
