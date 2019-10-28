import React from 'react';
import SatisfiedClientsContainer from './SatisfiedClientsContainer';
import RadarContainer from './RadarContainer';

import TopScoresContainer from './TopScoresContainer';
import CtruCircleContainer from './CtruCircleContainer';
import ParticipationCircleContainer from './ParticipationCircleContainer';
import CommentsContainer from './CommentsContainer';
import BlockWrapper from '../../../components/widgets/BlockWrapper';
import MainCriteriaBlock from '../../../components/widgets/MainCriteriaBlock';
import SubjectsBlock from '../../../components/widgets/SubjectsBlock';

function Overview({ match }) {
  return (
    <section className="content-body">
      <main className="main">
        <TopScoresContainer />
        <RadarContainer match={match} />
        <CommentsContainer />
      </main>
      <aside className="sidebar">
        <BlockWrapper title="My main criteria">
          <MainCriteriaBlock />
        </BlockWrapper>
        <BlockWrapper title="Most important subjects">
          <SubjectsBlock key="important" />
        </BlockWrapper>
        <BlockWrapper title="I like most on my company">
          <SubjectsBlock key="like" />
        </BlockWrapper>
        <SatisfiedClientsContainer match={match} />
        <CtruCircleContainer match={match} />
        <ParticipationCircleContainer match={match} />
      </aside>
    </section>
  );
}

export default Overview;
