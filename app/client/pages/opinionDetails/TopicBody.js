import React from 'react';
import { connect } from 'react-redux';

import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import ChartControls from './topicBody/ChartControls';
import RateChartContainer from './topicBody/RateChartContainer';
import CtruPieChartContainer from './topicBody/CtruPieChartContainer';

function TopicBody({ topic }) {
  const { name = '' } = topic;

  return (
    <section className="topic-details">
      <div className="topic-details__header">
        <h2 className="topic-details__title">{name}</h2>
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
  topic: opinionDetailsSelectors.selectedTopic(state) || {}
});

export default connect(mapStateToProps)(TopicBody);
