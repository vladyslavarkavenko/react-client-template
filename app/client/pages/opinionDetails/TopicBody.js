/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import ChartControls from './ChartControls';
import RateChartContainer from './RateChartContainer';
import CtruPieChartContainer from './CtruPieChartContainer';

function TopicBody({ status, topic }) {
  // if (status === 'request' || status === 'failure' || !topic) {
  //   return null;
  // }

  const { topicName = '' } = topic;

  return (
    <section className="topic-details">
      <div className="topic-details__header">
        <h2 className="topic-details__title">{topicName}</h2>
        <ChartControls />
      </div>
      <div className="topic-details__body">
        <RateChartContainer />
        <CtruPieChartContainer />
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  status: opinionDetailsSelectors.getCriteriaStatus(state),
  topic: opinionDetailsSelectors.selectedTopic(state) || {}
});

export default connect(mapStateToProps)(TopicBody);
