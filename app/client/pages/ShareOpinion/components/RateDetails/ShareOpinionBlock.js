import React from 'react';
import { connect } from 'react-redux';
import { historyPush } from '../../../../modules/redirect/redirectActions';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';
import routing from '../../../../utils/routing';

function ShareOpinionBlock({ selectedTopicsId, historyPush }) {
  const count = selectedTopicsId.length;

  if (!count) {
    return null;
  }

  return (
    <div className="details-list__block">
      <button
        type="button"
        className="share-btn"
        onClick={() => historyPush(routing().shareOpinionChart)}
      >
        Share opinion on {count} {count > 1 ? 'topics' : 'topic'}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedTopicsId: shareOpinionSelectors.selectedTopicsId(state)
});

const mapDispatchToProps = {
  historyPush
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareOpinionBlock);
