import React from 'react';

import MessageSvg from '../../../../../public/assets/svg/comment-alt-lines.duotone.svg';
import Comment from './Comment';
import WidgetPlaceholder from '../WidgetPlaceholder';
import Pagination from '../Pagination';

export default function CommentsList({ data, selectedTopicId, pagination, handleNextPage }) {
  const list = selectedTopicId
    ? data.filter((comment) => {
        const idList = comment.opinions.map((item) => item.topic.id);
        return idList.includes(selectedTopicId);
      })
    : data;

  const comments = list
    .slice(0, 5)
    .map((item) => (
      <Comment key={`${item.id}_comm`} data={item} selectedTopicId={selectedTopicId} />
    ));

  const { lastPage, currentPage } = pagination;

  return (
    <>
      <h2 className="info-block__title">Comments</h2>
      {comments.length !== 0 ? (
        <ul className="comment__list">{comments}</ul>
      ) : (
        <div className="comment__list">
          <WidgetPlaceholder icon={<MessageSvg />} title="No Comments Yet" withWrapper />
        </div>
      )}
      <Pagination currentPage={currentPage} lastPage={lastPage} onPageChanged={handleNextPage} />
    </>
  );
}
