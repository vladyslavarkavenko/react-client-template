import React from 'react';
import ListArrowDownSvg from '../../../../../../public/assets/svg/arrow-down.svg';
import ExclamationCircleEmptySvg from '../../../../../../public/assets/svg/exclamation-circle-empty.svg';
import TopicItem from './TopicItem';
import SubjectProgress from './SubjectProgress';

export default class SubjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { data } = this.props;
    const { id, name, image, topics } = data;

    const topicsList = topics.map((topic) => {
      const key = `${id}_${topic.id}`;

      return <TopicItem key={key} chekboxId={key} title={topic.name} />;
    });

    return (
      <li className={`details-list__subject ${isOpen ? 'active' : ''}`}>
        <div className="subject-main">
          <button type="button" className="subject-arrow" onClick={this.handleOpen}>
            <ListArrowDownSvg />
          </button>
          <div className="subject-img">
            <img
              src={image !== null ? image : `https://picsum.photos/300/300?${Math.random()}`}
              alt=""
            />
          </div>

          <div className="subject-info">
            <div className="subject-title">
              {name}
              <span>
                <ExclamationCircleEmptySvg />
              </span>
            </div>
            <SubjectProgress topics={topics} />
          </div>
        </div>

        {isOpen && <ul className="topics-list">{topicsList}</ul>}
      </li>
    );
  }
}
