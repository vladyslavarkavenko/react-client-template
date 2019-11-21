import React from 'react';
import { connect } from 'react-redux';

import { fetchComments } from '../../../modules/managerProfile/managerProfileActions';
import CommentsList from '../../../components/widgets/comment/CommentsList';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';

function CommentsContainer({ status, data, pagination, fetchComments, id }) {
  return (
    <CommentsList
      status={status}
      data={data}
      pagination={pagination}
      handleNextPage={(page) => fetchComments({ page, id })}
    />
  );
}

const mapStateToProps = (state, { match }) => {
  const {
    params: { id }
  } = match;

  const { status, data, pagination } = managerProfileSelectors.comments(state);

  return { status, data, pagination, id };
};

const mapDispatchToProps = {
  fetchComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
