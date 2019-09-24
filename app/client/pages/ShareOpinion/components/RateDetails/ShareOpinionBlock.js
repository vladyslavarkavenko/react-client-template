import React from 'react';
import { connect } from 'react-redux';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';

function ShareOpinionBlock({ selectedTopicsId }) {
  const count = selectedTopicsId.length;

  if (!count) {
    return null;
  }

  return (
    <div className="details-list__block">
      <button type="button" className="share-btn">
        Share opinion on {selectedTopicsId.length} topics
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedTopicsId: shareOpinionSelectors.selectedTopicsId(state)
});

const mapDispatchToProps = {
  // handleSelect: selectOpinionTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareOpinionBlock);
