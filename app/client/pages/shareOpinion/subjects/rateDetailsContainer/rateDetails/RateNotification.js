import React from 'react';
import { connect } from 'react-redux';
import ExclamationCircleSvg from '../../../../../../../public/assets/svg/exclamation-circle.svg';
import shareOpinionSelectors from '../../../../../modules/shareOpinion/shareOpinionSelectors';
import { selectOpinionExpired } from '../../../../../modules/shareOpinion/shareOpinionActions';

function RateNotification({ expiredTopics, selectOpinionExpired }) {
  if (!Object.keys(expiredTopics).length) {
    return null;
  }

  return (
    <li className="details-list__notify">
      <span className="notify-label" />
      <span className="notify-icon">
        <ExclamationCircleSvg />
      </span>
      <span className="notify-message">Some of your feedbacks has lost its impact</span>
      <button type="button" className="notify-btn" onClick={() => selectOpinionExpired()}>
        Update now
      </button>
    </li>
  );
}

const mapStateToProps = (state) => ({
  expiredTopics: shareOpinionSelectors.expiredOpinions(state)
});

const mapDispatchToProps = {
  selectOpinionExpired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateNotification);
