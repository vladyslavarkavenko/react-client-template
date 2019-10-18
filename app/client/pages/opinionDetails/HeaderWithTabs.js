import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setProfile, selectOption } from '../../modules/opinionDetails/opinionDetailsActions';
import { ROUTING_PARAMS } from '../../utils/constants';
import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
// import routing from '../../utils/routing';

/* eslint-disable */

class HeaderWithTabs extends React.Component {
  constructor(props) {
    super(props);

    this.CRITERIA = 'criteria';
    this.SUBJECT = 'subject';
    this.TOPIC = 'topic';

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ target }) {
    const {
      dataset: { type, id }
    } = target;

    if (type && id) {
      const { selectOption } = this.props;

      if (type === this.CRITERIA) {
        selectOption({ criteriaId: Number(id) });
        return;
      }

      if (type === this.SUBJECT) {
        selectOption({ subjectId: Number(id) });
        return;
      }

      if (type === this.TOPIC) {
        selectOption({ topicId: Number(id) });
        return;
      }
    }
  }

  componentDidMount() {
    const { match, location, history, setProfile } = this.props;
    const {
      params: { type, id }
    } = match;
    const { search } = location;
    // also need user id validation
    if (type !== ROUTING_PARAMS.MANAGER && type !== ROUTING_PARAMS.COMPANY) {
      history.push(routing().notFound);
      return;
    }

    const searchParams = new URLSearchParams(search.slice(1));

    setProfile({
      type,
      id,
      criteriaId: searchParams.get(ROUTING_PARAMS.CRITERIA_ID),
      subjectId: searchParams.get(ROUTING_PARAMS.SUBJECT_ID),
      topicId: searchParams.get(ROUTING_PARAMS.TOPIC_ID)
    });
  }

  render() {
    const {
      status,
      criteriaList,
      subjectList,
      topicList,
      selectedCriteria,
      selectedSubject,
      selectedTopic
    } = this.props;

    console.log(this.props);

    if (status === 'request') {
      return <SimpleContentHeader title="Opinions" />;
    }

    const criteria = criteriaList.map(({ criteriaName, criteriaId }) => {
      const isActive = criteriaId === selectedCriteria;
      return (
        <li
          key={`${criteriaId}_c`}
          data-type={this.CRITERIA}
          data-id={criteriaId}
          className={`criteria-tabs__item ${isActive ? 'active' : ''}`}
        >
          {criteriaName}
        </li>
      );
    });

    const subjects = subjectList.map(({ subjectName, subjectId }) => {
      const isActive = subjectId === selectedSubject;
      return (
        <li
          key={`${subjectId}_s`}
          data-type={this.SUBJECT}
          data-id={subjectId}
          className={`subject-tabs__item ${isActive ? 'active' : ''}`}
        >
          {subjectName}
        </li>
      );
    });

    const topics = topicList.map(({ topicName, topicId }) => {
      const isActive = topicId === selectedTopic.topicId;
      return (
        <li
          key={`${topicId}_s`}
          data-type={this.TOPIC}
          data-id={topicId}
          className={`topic-tabs__item ${isActive ? 'active' : ''}`}
        >
          {topicName}
        </li>
      );
    });

    return (
      <div className={`theme-${selectedCriteria}`}>
        <SimpleContentHeader title="Opinions" className="with-tabs">
          <ul className="criteria-tabs__list" onClick={this.handleSelect}>
            {criteria}
          </ul>
        </SimpleContentHeader>

        <ul className="subject-tabs__list" onClick={this.handleSelect}>
          {subjects}
        </ul>
        <ul className="topic-tabs__list" onClick={this.handleSelect}>
          {topics}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: opinionDetailsSelectors.getCriteriaStatus(state),
    criteriaList: opinionDetailsSelectors.getCriteriaList(state),
    subjectList: opinionDetailsSelectors.getSubjectList(state),
    topicList: opinionDetailsSelectors.getTopicList(state),

    selectedCriteria: opinionDetailsSelectors.selectedCriteria(state),
    selectedSubject: opinionDetailsSelectors.selectedSubject(state),
    selectedTopic: opinionDetailsSelectors.selectedTopic(state)
  };
};

const mapDispatchToProps = {
  setProfile,
  selectOption
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HeaderWithTabs);
