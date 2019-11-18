import React from 'react';

import { formatDate } from '../../../utils/helpers';

export default class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);

    this.maxLength = 5;

    this.state = {
      showAll: false
    };

    this.increaseShowCount = this.increaseShowCount.bind(this);
  }

  increaseShowCount() {
    this.setState({
      showAll: true
    });
  }

  render() {
    const { showAll } = this.state;
    const {
      data: { id, datetime, fullName, avatar, topics }
    } = this.props;

    const topicList = topics
      .slice(0, showAll ? topics.length : this.maxLength)
      .map(({ id: topicId, name, opinionCtruScore }) => (
        <li key={`${id}_${topicId}_${opinionCtruScore}`} className="topic-block">
          {name} <span className="score">{opinionCtruScore.toFixed(1)}</span>
        </li>
      ));

    const restLength = topics.length - topicList.length;

    return (
      <li key={`${id}_feed_item`} className="d-flex feedback-item">
        <div className="avatar circle">
          <img src={avatar || '/assets/img/empty-avatar.jpg'} alt="Avatar" />
        </div>
        <div className="w-100">
          <div className="top d-flex jc-between">
            <h6 className="name">{fullName}</h6>
            <p className="date">{formatDate(new Date(datetime))}</p>
          </div>
          <ul className="topics">
            {topicList}

            {restLength > 0 && (
              <li className="topic-btn" onClick={this.increaseShowCount}>
                +{restLength}
              </li>
            )}
          </ul>
        </div>
      </li>
    );
  }
}
