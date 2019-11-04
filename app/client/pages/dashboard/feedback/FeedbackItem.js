import React from 'react';
import { format } from 'date-fns';

const limit = 5;

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: 4
    };

    this.increaseShowCount = this.increaseShowCount.bind(this);
  }

  increaseShowCount() {
    this.setState((state) => ({
      showCount: state.showCount + limit
    }));
  }

  render() {
    const { showCount } = this.state;
    const {
      data: { id, date, fullName, avatar, topics }
    } = this.props;

    const restTopics = topics.length - showCount;

    return (
      <li key={id} className="d-flex feedback-item">
        <div className="avatar circle">
          <img src={avatar || '/assets/img/empty-avatar.jpg'} alt="Avatar" />
        </div>
        <div className="w-100">
          <div className="top d-flex jc-between">
            <h6 className="name">{fullName}</h6>
            <p className="date">{format(new Date(date), 'MMM i')}</p>
          </div>
          <ul className="topics">
            {topics.slice(0, showCount).map(({ id, name, opinionCtruScore }) => (
              <li key={id} className="topic-block">
                <span>{opinionCtruScore}</span> {name}
              </li>
            ))}
            {restTopics > 0 && (
              <li key={id} className="topic-block cursor-pointer" onClick={this.increaseShowCount}>
                +{restTopics > limit ? limit : restTopics}
              </li>
            )}
          </ul>
        </div>
      </li>
    );
  }
}

export default FeedbackItem;
