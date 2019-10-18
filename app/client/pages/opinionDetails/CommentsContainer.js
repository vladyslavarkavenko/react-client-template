import React from 'react';
import { connect } from 'react-redux';

import CommentsList from '../../components/widgets/comment/CommentsList';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';

function CommentsContainer({ data, topicId }) {
  if (!data.length) {
    return null;
  }

  return <CommentsList data={data} selectedTopicId={topicId} />;
}

const mapStateToProps = (state) => {
  const data = opinionDetailsSelectors.comments(state);
  const { topicId } = opinionDetailsSelectors.selectedTopic(state) || {};

  return { data, topicId };
};

export default connect(mapStateToProps)(CommentsContainer);
