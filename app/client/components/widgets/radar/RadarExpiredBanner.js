import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProgressBar from '../../ui-components/ProgressBar';
import routing from '../../../utils/routing';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';

function RadarExpiredBanner({ selected, expiredCount, totalCount }) {
  if (!selected || !expiredCount) {
    return null;
  }

  const { label, id, type } = selected;

  const percentage = Math.round((expiredCount / totalCount) * 100);

  return (
    <div className="radar-banner">
      <Link to={routing({ id, type }).shareOpinionWithProfile} className="update-now-btn">
        Update Now
      </Link>
      <p className="radar-banner__title">{label}</p>
      <p className="radar-banner__subtitle">
        {expiredCount} of {totalCount} feedbacks has lost its impact
      </p>
      <ProgressBar className="white" percentage={percentage} />
    </div>
  );
}

const mapStateToProps = (state, { selected }) => {
  let expiredCount = 0;
  let totalCount = 0;

  if (selected && selected.id && selected.type) {
    const expired = shareOpinionSelectors.getGlobalExpired(state);
    const opinions = shareOpinionSelectors.getGlobalOpinions(state);

    try {
      expiredCount = Object.keys(expired[selected.type.toUpperCase()][selected.id]).length;

      totalCount = opinions[selected.type.toUpperCase()][selected.id];
    } catch (err) {
      console.error(err);
    }
  }

  return { expiredCount, totalCount };
};

export default connect(mapStateToProps)(RadarExpiredBanner);
