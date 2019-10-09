import React from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

import { ROLES } from '../../../../../utils/constants';
import routing from '../../../../../utils/routing';

export default function RateHeader({ profile }) {
  if (!profile) {
    return null;
  }

  const { id, type, title } = profile;
  const link =
    type === ROLES.MANAGER
      ? routing(id).managerProfileOverview
      : routing(id).companyProfileOverview;

  return (
    <div className="rate-details selected-profile">
      <div className="selected-profile__title">{title}</div>
      <Link to={link} className="selected-profile__link">
        {i18next.t('shareOpinion.profile')}
      </Link>
    </div>
  );
}
