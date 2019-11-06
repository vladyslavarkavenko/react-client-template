import React from 'react';
import { Link } from 'react-router-dom';

import ProgressBar from '../../ui-components/ProgressBar';
import routing from '../../../utils/routing';

export default function RadarExpiredBanner({ selected }) {
  if (!selected) {
    return null;
  }

  const { label, id, type } = selected;

  return (
    <div className="radar-banner">
      <Link to={routing({ id, type }).shareOpinionWithProfile} className="update-now-btn">
        Update Now
      </Link>
      <p className="radar-banner__title">{label}</p>
      <p className="radar-banner__subtitle">8 of 10 feedbacks has lost its impact</p>
      <ProgressBar className="white" percentage={50} />
    </div>
  );
}
