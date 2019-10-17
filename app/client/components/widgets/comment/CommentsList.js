import React from 'react';
import Comment from './Comment';

const data = [
  {
    id: 1,
    rate: 8.5,
    date: '2019-10-16',
    author: 'Max Melnychuk',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit '
  },
  {
    id: 2,
    rate: 4.0,
    date: '2019-08-02',
    author: 'Anton Ribka',
    text:
      'Lorem ipsum dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
  },
  {
    id: 3,
    rate: 7.0,
    date: '2019-05-30',
    author: 'Hubka Bob',
    text:
      'Ultrices in iaculis nunc sed augue lacus viverra. Faucibus ornare suspendisse sed nisi lacus sed. Nisl vel pretium lectus quam id. Fames ac turpis egestas integer eget aliquet nibh praesent. Aliquet nibh praesent tristique magna sit amet purus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum. Egestas sed sed risus pretium quam vulputate. Pellentesque diam volutpat commodo sed. Vel facilisis volutpat est velit egestas dui id. Eu lobortis elementum nibh tellus molestie nunc non blandit. Et netus et malesuada fames ac turpis egestas. Arcu ac tortor dignissim convallis aenean et tortor at risus. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. Amet cursus sit amet dictum. Ut enim blandit volutpat maecenas volutpat. Vel facilisis volutpat est velit egestas dui id.'
  }
];

export default function CommentsList() {
  const comments = data.map((item) => <Comment key={`${item.id}_comm`} data={item} />);
  return (
    <>
      <h2 className="info-block__title">Comments</h2>
      <ul className="comment__list">{comments}</ul>
    </>
  );
}
