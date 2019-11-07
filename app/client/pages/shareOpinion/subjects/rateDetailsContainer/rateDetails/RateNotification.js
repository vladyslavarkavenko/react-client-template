import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';

import shareOpinionSelectors from '../../../../../modules/shareOpinion/shareOpinionSelectors';
import { selectOpinionExpired } from '../../../../../modules/shareOpinion/shareOpinionActions';
import Alert from '../../../../../components/ui-components/Alert';

function RateNotification({ isExpired, selectOpinionExpired }) {
  if (!isExpired) {
    return null;
  }

  return (
    <li className="details-list__notify">
      <Alert type={Alert.failure} message={i18next.t('shareOpinion.alert.impact')}>
        <button type="button" className="notify-btn" onClick={() => selectOpinionExpired()}>
          {i18next.t('shareOpinion.buttons.updateNow')}
        </button>
      </Alert>
    </li>
  );
}

const mapStateToProps = (state) => {
  let isExpired = false;

  const profile = shareOpinionSelectors.selectedProfile(state);

  if (profile) {
    const { type, id } = profile;

    const expired = shareOpinionSelectors.getGlobalExpired(state, {
      profileType: type,
      profileId: id
    });

    isExpired = Object.keys(expired).length !== 0;
  }

  return { isExpired };
};

const mapDispatchToProps = {
  selectOpinionExpired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateNotification);
