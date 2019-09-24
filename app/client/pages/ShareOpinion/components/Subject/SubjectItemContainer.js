import React from 'react';
import { connect } from 'react-redux';
import { selectOpinionTopic } from '../../../../modules/shareOpinion/shareOpinionActions';
import shareOpinionSelectors from '../../../../modules/shareOpinion/shareOpinionSelectors';

import SubjectItem from './SubjectItem';

function SubjectItemContainer(props) {
  return <SubjectItem {...props} />;
}

const mapStateToProps = (state, props) => {
  const { id } = props.data;

  return {
    selectedTopicsId: shareOpinionSelectors.selectedTopicsId(state),
    expiredTopics: shareOpinionSelectors.expiredOpinionsById(state, id)
  };
};

const mapDispatchToProps = {
  handleSelect: selectOpinionTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectItemContainer);
