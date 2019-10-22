import React from 'react';
import { connect } from 'react-redux';

import companyProfileSelectors from '../../../modules/companyProfile/companyProfileSelectors';
import CommentsList from '../../../components/widgets/comment/CommentsList';

function CommentsContainer({ status, data }) {
  if (status !== 'success' || !data.length) {
    return null;
  }

  return <CommentsList data={data} />;
}

const mapStateToProps = (state) => {
  const { status, data } = companyProfileSelectors.comments(state);

  return { status, data };
};

export default connect(mapStateToProps)(CommentsContainer);
