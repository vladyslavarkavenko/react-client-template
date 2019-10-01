import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';

function OpinionAboutBlock({ topics, activeTopic = {}, profile, backgroundColor = '#13C29B' }) {
  if (!topics.length) {
    return null;
  }

  const list = topics.map((topic) => (
    <li
      key={`${topic.id}_bar`}
      className={`opinion-about__item ${topic.id === activeTopic.id ? 'active' : ''}`}
    >
      {topic.name}
      {topic.score && <span className="score">{topic.score}</span>}
    </li>
  ));

  return (
    <div className="opinion-about" style={{ backgroundColor }}>
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
  activeTopic: shareOpinionSelectors.nextUnratedTopic(state)
});

export default connect(mapStateToProps)(OpinionAboutBlock);
