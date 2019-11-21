import React from 'react';
import { connect } from 'react-redux';

import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import CommentsList from '../../../components/widgets/comment/CommentsList';
import { fetchComments } from '../../../modules/managerProfile/managerProfileActions';

function CommentsContainer({ data, pagination, fetchComments, id }) {
  return (
    <CommentsList
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

  const { status, data, pagination } = companyProfileSelectors.comments(state);

  return { status, data, pagination, id };
};

const mapDispatchToProps = {
  fetchComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
