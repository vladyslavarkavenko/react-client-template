import React from 'react';
import { connect } from 'react-redux';
import opinionDetailsSelectors from '../../modules/opinionDetails/opinionDetailsSelectors';
import RadioGroup from '../../components/ui-components/Form/RadioGroup';
import CtruPieChart from './CtruPieChart';
import RateChart from './RateChart';

function TopicBody({ status, topic }) {
  if (status === 'request' || status === 'failure' || !topic) {
    return null;
  }

  const { topicName } = topic;

  return (
    <section className="topic-details">
      <div className="topic-details__header">
        <h2 className="topic-details__title">{topicName}</h2>
        {/*<div className="topic-details__filter">*/}
        {/*  <button type="rad">Satisfaction</button>*/}
        {/*  <button type="button">Importance</button>*/}
        {/*  <button type="button">Both </button>*/}
        {/*</div>*/}

        <div className="topic-details__filter">
          <RadioGroup
            options={[
              { title: 'Satisfaction', value: 1 },
              { title: 'Importance', value: 2 },
              { title: 'Both', value: 3 }
            ]}
            selected={3}
          />
        </div>

        <div className="topic-details__control">
          <div className="date-range">
            <RadioGroup
              options={[
                { title: 'Week', value: 1 },
                { title: 'Month', value: 2 },
                { title: 'Year', value: 3 }
              ]}
              selected={3}
              theme="gray"
            />
          </div>

          <button className="arrow" type="button">
            {'<'}
          </button>
          <button className="arrow" type="button">
            {'>'}
          </button>
        </div>
      </div>
      <div className="topic-details__body">
        <RateChart />
        <CtruPieChart />
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  status: opinionDetailsSelectors.getCriteriaStatus(state),
  topic: opinionDetailsSelectors.selectedTopic(state)
});

export default connect(mapStateToProps)(TopicBody);
