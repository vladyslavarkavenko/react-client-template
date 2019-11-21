import React, { useRef } from 'react';

import MessageSvg from '../../../../../public/assets/svg/comment-alt-lines.duotone.svg';
import Comment from './Comment';
import WidgetPlaceholder from '../WidgetPlaceholder';
import Pagination from '../Pagination';
import Skeleton from './Skeleton';

export default function CommentsList({
  data,
  selectedTopicId,
  pagination,
  handleNextPage,
  status
}) {
  const headerElem = useRef(null);

  if (status === 'request') {
    return (
      <>
        <h2 className="info-block__title" ref={headerElem}>
          Comments
        </h2>
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={`com_sk_${i}`} index={i} selectedTopicId={selectedTopicId} />
          ))}
        <Pagination currentPage={1} lastPage={1} />
      </>
    );
  }

  const list = selectedTopicId
    ? data.filter((comment) => {
        const idList = comment.opinions.map((item) => item.topic.id);
        return idList.includes(selectedTopicId);
      })
    : data;

  const comments = list.map((item) => (
    <Comment key={`${item.id}_comm`} data={item} selectedTopicId={selectedTopicId} />
  ));

  const { lastPage, currentPage } = pagination;

  return (
    <>
      <h2 className="info-block__title" ref={headerElem}>
        Comments
      </h2>
      {comments.length !== 0 ? (
        <ul className="comment__list">{comments}</ul>
      ) : (
        <div className="comment__list">
          <WidgetPlaceholder icon={<MessageSvg />} title="No Comments Yet" withWrapper />
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChanged={handleNextPage}
        forwardRef={headerElem}
      />
    </>
  );
}
