import React from 'react';
import { connect } from 'react-redux';

import CommentsList from '../../../components/widgets/comment/CommentsList';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';

function CommentsContainer({ status, data }) {
  if (status !== 'success' || !data.length) {
    return null;
  }

  return <CommentsList data={data} />;
}

const mapStateToProps = (state) => {
  const { status, data } = managerProfileSelectors.comments(state);

  return { status, data };
};

export default connect(mapStateToProps)(CommentsContainer);
