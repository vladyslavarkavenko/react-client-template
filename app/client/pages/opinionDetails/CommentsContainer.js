import React from 'react';
import { connect } from 'react-redux';

import CommentsList from '../../components/widgets/comment/CommentsList';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';

function CommentsContainer({ data, id }) {
  return <CommentsList data={data} selectedTopicId={id} />;
}

const mapStateToProps = (state) => {
  const data = opinionDetailsSelectors.comments(state);
  const { id } = opinionDetailsSelectors.selectedTopic(state) || {};

  return { data, id };
};

export default connect(mapStateToProps)(CommentsContainer);
