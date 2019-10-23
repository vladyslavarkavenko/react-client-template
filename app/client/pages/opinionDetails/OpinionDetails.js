import React from 'react';

import ParticipationCircle from '../../components/widgets/ParticipationCircle';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import HeaderWithTabs from './HeaderWithTabs';
import TopicBody from './TopicBody';
import CommentsContainer from './CommentsContainer';

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
          <BlockWrapper>
            <ParticipationCircle />
          </BlockWrapper>
        </div>
      </section>
    </section>
  );
}
