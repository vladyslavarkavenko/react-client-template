import React from 'react';
import CommentsList from '../../components/widgets/comment/CommentsList';
import ParticipationCircle from '../../components/widgets/ParticipationCircle';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import HeaderWithTabs from './HeaderWithTabs';
import TopicBody from './TopicBody';

export default function OpinionDetails() {
  return (
    <section className="opinion-details">
      <HeaderWithTabs />

      <TopicBody />

      <section className="content-body">
        <div className="main">
          <CommentsList />
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
