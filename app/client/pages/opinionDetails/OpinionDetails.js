import React from 'react';

import HeaderWithTabs from './HeaderWithTabs';
import TopicBody from './TopicBody';
import CommentsContainer from './CommentsContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';

export default function OpinionDetails() {
  return (
    <section className="opinion-details">
      <HeaderWithTabs />

      <TopicBody />

      <section className="content-body">
        <div className="main">
          <CommentsContainer />
        </div>
        <div className="sidebar">
          <ParticipationCircleContainer />
        </div>
      </section>
    </section>
  );
}
