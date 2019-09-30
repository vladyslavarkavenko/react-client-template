import React from 'react';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../../../../modules/shareOpinion/shareOpinionSelectors';
import { selectOpinionExpired } from '../../../../../modules/shareOpinion/shareOpinionActions';
import Alert from '../../../../../components/ui-components/Alert';

function RateNotification({ expiredTopics, selectOpinionExpired }) {
  if (!Object.keys(expiredTopics).length) {
    return null;
  }

  return (
    <li className="details-list__notify">
      <Alert type={Alert.failure} message="Some of your feedbacks has lost its impact">
        <button type="button" className="notify-btn" onClick={() => selectOpinionExpired()}>
          Update now
        </button>
      </Alert>
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
