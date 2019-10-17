import React from 'react';
import CommentsList from '../../components/widgets/comment/CommentsList';
import ParticipationCircle from '../../components/widgets/ParticipationCircle';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import HeaderWithTabs from './HeaderWithTabs';

export default function OpinionDetails() {
  return (
    <section className="opinion-details theme-green">
      <HeaderWithTabs />

      <section className="topic-details content-body" />

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
