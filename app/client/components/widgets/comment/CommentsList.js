import React from 'react';
import Comment from './Comment';

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
      <ul className="comment__list">{comments}</ul>
    </>
  );
}
