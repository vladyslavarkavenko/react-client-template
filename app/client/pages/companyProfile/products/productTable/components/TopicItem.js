import React from 'react';
import { Link } from 'react-router-dom';

import routing from '../../../../../utils/routing';
import { ROUTING_PARAMS } from '../../../../../utils/constants';

export default function TopicItem({ topic }) {
  if (topic) {
    const params = {
      type: ROUTING_PARAMS.COMPANY,
      id: topic.companyId,
      [ROUTING_PARAMS.SUBJECT_ID]: topic.subjectId,
      [ROUTING_PARAMS.TOPIC_ID]: topic.id
    };

    return (
      <li className="section-products__item item item-product">
        <Link to={routing(params).opinionDetails} className="title">
          {topic.name}
        </Link>
        {topic.ctruScore ? (
          <span className={`score score-${Math.round(topic.ctruScore)}`}>
            {topic.ctruScore.toFixed(1)}
          </span>
        ) : (
          <span className="score">0.0</span>
        )}
      </li>
    );
  }

  return <li className="section-products__item item item-product" />;
}
