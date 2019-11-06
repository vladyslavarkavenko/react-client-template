import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProgressBar from '../../ui-components/ProgressBar';
import routing from '../../../utils/routing';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';

function RadarExpiredBanner({ selected, expiredCount }) {
  if (!selected || !expiredCount) {
    return null;
  }

  const { label, id, type } = selected;

  const total = 10;

  const percentage = Math.round((expiredCount / total) * 100);

  return (
    <div className="radar-banner">
      <Link to={routing({ id, type }).shareOpinionWithProfile} className="update-now-btn">
        Update Now
      </Link>
      <p className="radar-banner__title">{label}</p>
      <p className="radar-banner__subtitle">
        {expiredCount} of {total} feedbacks has lost its impact
      </p>
      <ProgressBar className="white" percentage={percentage} />
    </div>
  );
}

const mapStateToProps = (state, { selected }) => {
  let expiredCount = 0;

  if (selected && selected.id && selected.type) {
    const expired = shareOpinionSelectors.getGlobalExpired(state);

    try {
      expiredCount = Object.keys(expired[selected.type.toUpperCase()][selected.id]).length;
    } catch (err) {
      console.error(err);
    }
  }

  return { expiredCount };
};

export default connect(mapStateToProps)(RadarExpiredBanner);
