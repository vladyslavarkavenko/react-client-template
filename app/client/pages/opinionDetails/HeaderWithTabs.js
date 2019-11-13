import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setProfile, selectOption } from '../../modules/opinionDetails/opinionDetailsActions';
import { ROUTING_PARAMS } from '../../utils/constants';
import SimpleHeader from '../../components/ui-components/Layout/SimpleHeader';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import authSelectors from '../../modules/auth/authSelectors';
import routing from '../../utils/routing';

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
    const { match, location, history, setProfile, user } = this.props;
    const {
      params: { type, id }
    } = match;
    const { search } = location;

    if (match.path === routing().myOpinionDetails) {
      setProfile({
        type: ROUTING_PARAMS.MANAGER,
        id: user.staffId
      });
      return;
    }

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

    if (status === 'request' || status === 'failure') {
      return <SimpleHeader title="Opinions" />;
    }

    const criteria = criteriaList.map(({ name, id }) => {
      const isActive = id === selectedCriteria;
      return (
        <li
          key={`${id}_c`}
          data-type={this.CRITERIA}
          data-id={id}
          className={`criteria-tabs__item ${isActive ? 'active' : ''}`}
        >
          {name}
        </li>
      );
    });

    const subjects = subjectList.map(({ name, id }) => {
      const isActive = id === selectedSubject;
      return (
        <li
          key={`${id}_s`}
          data-type={this.SUBJECT}
          data-id={id}
          className={`subject-tabs__item ${isActive ? 'active' : ''}`}
        >
          {name}
        </li>
      );
    });

    const topics = topicList.map(({ name, id }) => {
      const isActive = id === selectedTopic.id;
      return (
        <li
          key={`${id}_s`}
          data-type={this.TOPIC}
          data-id={id}
          className={`topic-tabs__item ${isActive ? 'active' : ''}`}
        >
          {name}
        </li>
      );
    });

    return (
      <>
        <SimpleHeader title="Opinions" className="with-tabs">
          <ul
            className={`criteria-tabs__list theme-${selectedCriteria}`}
            onClick={this.handleSelect}
          >
            {criteria}
          </ul>
        </SimpleHeader>
        <ul className={`subject-tabs__list theme-${selectedCriteria}`} onClick={this.handleSelect}>
          {subjects}
        </ul>
        <ul className={`topic-tabs__list theme-${selectedCriteria}`} onClick={this.handleSelect}>
          {topics}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: authSelectors.user(state),
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
