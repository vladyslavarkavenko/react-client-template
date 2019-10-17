import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setProfile } from '../../modules/opinionDetails/opinionDetailsActions';
import { ROUTING_PARAMS } from '../../utils/constants';
import SimpleContentHeader from '../../components/ui-components/Layout/SimpleContentHeader';
// import routing from '../../utils/routing';

/* eslint-disable */

class HeaderWithTabs extends React.Component {
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
    return (
      <>
        <SimpleContentHeader title="Opinions" className="with-tabs">
          <ul className="criteria-tabs__list">
            <li className="criteria-tabs__item active">Banker</li>
            <li className="criteria-tabs__item">Saving account</li>
            <li className="criteria-tabs__item">Investment funds</li>
            <li className="criteria-tabs__item">Mortage</li>
          </ul>
        </SimpleContentHeader>

        <ul className="subject-tabs__list">
          <li className="subject-tabs__item">Convenient</li>
          <li className="subject-tabs__item">Creative</li>
          <li className="subject-tabs__item active">Clear</li>
          <li className="subject-tabs__item">Cost conscious</li>
        </ul>
        <ul className="topic-tabs__list">
          <li className="topic-tabs__item">Experienced</li>
          <li className="topic-tabs__item active">Explains product well</li>
        </ul>
      </>
    );
  }
}

// const mapStateToProps = (state, { match, location }) => {
//   return {};
// };

const mapDispatchToProps = {
  setProfile
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(HeaderWithTabs);
