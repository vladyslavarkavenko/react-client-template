import React from 'react';

import MessageSvg from '../../../../../public/assets/svg/comment-alt-lines.duotone.svg';
import Comment from './Comment';
import WidgetPlaceholder from '../WidgetPlaceholder';

export default function CommentsList({ data, selectedTopicId }) {
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
    </>
  );
}
