import React from 'react';
import { connect } from 'react-redux';

import { clearAll } from '../../modules/opinionDetails/opinionDetailsActions';
import HeaderWithTabs from './HeaderWithTabs';
import TopicBody from './TopicBody';
import CommentsContainer from './CommentsContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class OpinionDetails extends React.Component {
  componentWillUnmount() {
    const { clearAll } = this.props;
    clearAll();
  }

  render() {
    const { status } = this.props;

    return (
      <section className="opinion-details">
        <HeaderWithTabs />

        {status === 'request' && <LoaderBlock height="50vh" />}

        {status === 'success' && (
          <>
            <TopicBody />

            <section className="content-body">
              <div className="main">
                <CommentsContainer />
              </div>
              <div className="sidebar">
                <ParticipationCircleContainer />
              </div>
            </section>
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  status: opinionDetailsSelectors.getCriteriaStatus(state)
});

const mapDispatchToProps = {
  clearAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionDetails);
