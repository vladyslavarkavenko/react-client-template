import React from 'react';
import { format } from 'date-fns';

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
      showCount: state.showCount + 5
    }));
  }

  render() {
    const { showCount } = this.state;
    const {
      data: { id, date, fullName, avatar, topics }
    } = this.props;

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
            {topics.length > showCount && (
              <li key={id} className="topic-block cursor-pointer" onClick={this.increaseShowCount}>
                +{topics.length - showCount}
              </li>
            )}
          </ul>
        </div>
      </li>
    );
  }
}

export default FeedbackItem;
