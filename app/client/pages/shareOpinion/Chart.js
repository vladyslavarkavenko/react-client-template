import React from 'react';
import { connect } from 'react-redux';
import Button from '../../components/ui-components/Form/Button';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import { pushRateTopic } from '../../modules/shareOpinion/shareOpinionActions';
import OpinionAboutBlock from './OpinionAboutBlock';

function Chart({ selectedTopics, nextUnratedTopic, pushRateTopic }) {
  if (!nextUnratedTopic) {
    //redirect in saga
    return null;
  }

  return (
    <div className="rate-opinion content">
      <OpinionAboutBlock />
      List of selected topics
      <ul>
        {selectedTopics.map((topic) => (
          <li
            key={topic.id}
            style={{ backgroundColor: nextUnratedTopic.id === topic.id ? 'green' : '' }}
          >
            {topic.name}; {topic.isRated && `Rating: [${topic.satisfaction}, ${topic.importance}]`}
          </li>
        ))}
      </ul>
      Current unrated topic: {nextUnratedTopic && nextUnratedTopic.name}
      <Button onClick={() => pushRateTopic({ satisfaction: 6, importance: 4 })}>Next</Button>
      <Button>Cancel</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedTopics: shareOpinionSelectors.selectedTopics(state),
  nextUnratedTopic: shareOpinionSelectors.nextUnratedTopic(state)
});

const mapDispatchToProps = {
  pushRateTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
