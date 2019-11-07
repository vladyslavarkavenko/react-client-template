import React from 'react';
import { connect } from 'react-redux';

import shareOpinionSelectors from '../../../../../modules/shareOpinion/shareOpinionSelectors';
import {
  pushNewTopic,
  selectOpinionTopic
} from '../../../../../modules/shareOpinion/shareOpinionActions';
import ListArrowDownSvg from '../../../../../../../public/assets/svg/arrow-down.svg';
import ExclamationCircleEmptySvg from '../../../../../../../public/assets/svg/exclamation-circle.svg';
import CheckCircleEmptySvg from '../../../../../../../public/assets/svg/check-circle.svg';

import TopicItem from './subjectItem/TopicItem';
import SubjectProgress from './subjectItem/SubjectProgress';

class SubjectItem extends React.Component {
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
    const {
      data,
      handleSelect,
      selectedTopicsId,
      actualSubjectsId,
      expiredTopics,
      handleModal
    } = this.props;
    const { id, name, image, topics } = data;

    const isActual = actualSubjectsId.includes(id);

    console.log(expiredTopics);

    const topicsList = topics.map((topic) => {
      const key = `${id}_${topic.id}`;

      return (
        <TopicItem
          key={key}
          checkboxId={key}
          data={topic}
          expiredTopics={expiredTopics}
          selectedTopicsId={selectedTopicsId}
          handleSelect={handleSelect}
        />
      );
    });

    return (
      <li className={`details-list__subject ${isOpen ? 'active' : ''}`}>
        <div className="subject-main">
          <button type="button" className="subject-arrow" onClick={this.handleOpen}>
            <ListArrowDownSvg />
          </button>
          <div className="subject-img">
            <img
              src={image !== null ? image : `https://picsum.photos/300/300?${id}_topic`}
              alt=""
            />
          </div>

          <div className="subject-info" onClick={this.handleOpen}>
            <div className="subject-title">
              {name}

              {expiredTopics.length !== 0 && (
                <span className="red">
                  <ExclamationCircleEmptySvg />
                </span>
              )}

              {isActual && (
                <span className="green">
                  <CheckCircleEmptySvg />
                </span>
              )}
            </div>
            <SubjectProgress topics={topics} />
          </div>
          <button type="button" className="subject-add" onClick={() => handleModal(data)}>
            +
          </button>
        </div>

        {isOpen && <ul className="topics-list">{topicsList}</ul>}
      </li>
    );
  }
}

const mapStateToProps = (state, { data }) => {
  const { id: subjectId } = data;
  const { type: profileType, id: profileId } = shareOpinionSelectors.selectedProfile(state);

  return {
    selectedTopicsId: shareOpinionSelectors.selectedTopicsId(state),
    expiredTopics: shareOpinionSelectors.getGlobalExpired(state, {
      profileType,
      profileId,
      subjectId
    }),
    actualSubjectsId: shareOpinionSelectors.actualSubjectsId(state)
  };
};

const mapDispatchToProps = {
  handleSelect: selectOpinionTopic,
  handleModal: pushNewTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectItem);
