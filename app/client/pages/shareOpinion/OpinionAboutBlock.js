import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';
import { calculateColorByPointHSL } from '../../utils/calculateColor';

function OpinionAboutBlock({
  topics,
  activeTopic = {},
  profile,
  backgroundColor = '#13C29B',
  averageRate,
  withScore
}) {
  if (!topics.length) {
    return null;
  }

  const list = topics.map((topic) => (
    <li
      key={`${topic.id}_bar`}
      className={`opinion-about__item ${topic.id === activeTopic.id ? 'active' : ''}`}
    >
      {topic.name}
      {withScore && topic.score && <span className="score">{topic.score.toFixed(1)}</span>}
    </li>
  ));

  let calculatedColor;

  if (withScore) {
    calculatedColor = calculateColorByPointHSL(averageRate, 10);
  }

  return (
    <div className="opinion-about" style={{ backgroundColor: calculatedColor || backgroundColor }}>
      <div className="container">
        <p className="opinion-about__title">
          {i18next.t('shareOpinion.opinionAbout')} {profile.title}
        </p>
        <ul className="opinion-about__list">{list}</ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: shareOpinionSelectors.selectedProfile(state),
  topics: shareOpinionSelectors.selectedTopics(state),
  activeTopic: shareOpinionSelectors.nextUnratedTopic(state),
  averageRate: shareOpinionSelectors.averageRate(state)
});

export default connect(mapStateToProps)(OpinionAboutBlock);
