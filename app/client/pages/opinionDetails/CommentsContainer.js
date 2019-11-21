import React from 'react';
import { connect } from 'react-redux';

import CommentsList from '../../components/widgets/comment/CommentsList';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import { fetchOpinionComments } from '../../modules/opinionDetails/opinionDetailsActions';

function CommentsContainer({ status, data, pagination, fetchComments, id }) {
  return (
    <CommentsList
      status={status}
      data={data}
      selectedTopicId={id}
      pagination={pagination}
      handleNextPage={(page) => fetchComments({ page })}
    />
  );
}

const mapStateToProps = (state) => {
  const { status, data, pagination } = opinionDetailsSelectors.comments(state);
  const { id } = opinionDetailsSelectors.selectedTopic(state) || {};

  return { status, data, pagination, id };
};

const mapDispatchToProps = {
  fetchComments: fetchOpinionComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
