/* eslint-disable */
import React from 'react';

/* eslint-disable */
const tags = [
  {
    title: 'Product',
    id: 1
  },
  {
    title: 'Service',
    id: 2
  },
  {
    title: 'Personal',
    id: 3
  },
  {
    title: 'Alternative',
    id: 4
  }
];

const subjects = [
  {
    id: 1,
    title: 'Credit',
    topics: [
      {
        id: 1,
        title: 'Personal loan',
        score: 6.5,
        tags: [1]
      },
      {
        id: 2,
        title: 'Mortages',
        score: 7.9,
        tags: [2, 3]
      },
      {
        id: 3,
        title: 'Clientis Immo Swar',
        score: 8.2,
        tags: [4]
      }
    ]
  },
  {
    id: 2,
    title: 'Payments',
    topics: [
      {
        id: 4,
        title: 'Maestro Card',
        score: 8.5,
        tags: [1]
      },
      {
        id: 5,
        title: 'Visa Card',
        score: 9.9,
        tags: [1]
      },
      {
        id: 6,
        title: 'Master Card',
        score: 8.8,
        tags: [1]
      }
    ]
  },
  {
    id: 3,
    title: 'Accounts',
    topics: [
      {
        id: 7,
        title: 'Current Account',
        score: 7.5,
        tags: [1, 4]
      },
      {
        id: 8,
        title: 'Saving Account',
        score: 6.9,
        tags: [1, 3]
      },
      {
        id: 9,
        title: 'Private Account',
        score: 6.0,
        tags: [1, 2, 4]
      },
      {
        id: 9,
        title: 'Another Account',
        score: 7.0,
        tags: [1, 4]
      }
    ]
  }
];

function HeaderRow({ tags }) {
  const list = tags.map((tag) => (
    <li key={`${tag.id}_head_r`} className="item item-product">
      {tag.title}
    </li>
  ));

  return (
    <ul className="head">
      <li className="item item-subject">Subject</li>
      {list}
    </ul>
  );
}

function TagsCols({ tags, topic }) {
  const cols = tags.map((item) =>
    topic.tags.includes(item.id) ? (
      <li
        data-key={`${item.id}_${topic.id}_col`}
        key={`${item.id}_${topic.id}_col`}
        className="section-products__item item item-product"
      >
        <span className="title">{topic.title}</span>
        <span className="score">{topic.score.toFixed(1)}</span>
      </li>
    ) : (
      <li
        data-key={`${item.id}_${topic.id}_col`}
        key={`${item.id}_${topic.id}_col`}
        className="section-products__item item item-product"
      />
    )
  );

  return <ul className="section-products__list">{cols}</ul>;
}

function SubjectRow({ tags, data }) {
  const { id, title, topics } = data;

  const items = topics.map((item) => (
    <TagsCols key={`${id}_${item.id}_sub`} tags={tags} topic={item} />
  ));

  return (
    <li className="row">
      <div className="section-subject item item-subject">
        <span className="title">{title}</span>
      </div>
      <div className="section-products">{items}</div>
    </li>
  );
}

export default function Table() {
  const rows = subjects.map((sub) => <SubjectRow tags={tags} data={sub} />);
  return (
    <div className="service-table">
      <HeaderRow tags={tags} />
      <ul className="body">{rows}</ul>
    </div>
  );
}

// <li className="row">
//   <div className="section-subject item item-subject">
//     <span className="title">Credit</span>
//   </div>
//   <div className="section-products">
//     <ul className="section-products__list">
//       <li className="section-products__item item item-product">
//         <span className="title">Product 1</span>
//         <span className="score">7.6</span>
//       </li>
//       <li className="section-products__item item item-product">
//         {/*<span className="title"></span>*/}
//         {/*<span className="score"></span>*/}
//       </li>
//     </ul>
//
//     <ul className="section-products__list">
//       <li className="section-products__item item item-product">
//         {/*<span className="title"></span>*/}
//         {/*<span className="score"></span>*/}
//       </li>
//       <li className="section-products__item item item-product">
//         <span className="title">Product 3</span>
//         <span className="score">5.6</span>
//       </li>
//     </ul>
{
  /*  </div>*/
}
{
  /*</li>*/
}
