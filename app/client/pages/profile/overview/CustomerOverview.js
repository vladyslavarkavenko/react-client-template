import React from 'react';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import MainCriteriaBlock from '../../../components/widgets/MainCriteriaBlock';
import SubjectsBlock from '../../../components/widgets/SubjectsBlock';
import MainAspectsBlock from '../../../components/widgets/mainAspects/MainAspectsBlock';
import RadarTitle from '../../../components/widgets/radar/RadarTitle';
import Radar from '../../../components/widgets/radar/Radar';

function CustomerOverview() {
  return (
    <section className="content-body">
      <main className="main">
        <BlockWrapper title={<RadarTitle />}>
          <Radar />
        </BlockWrapper>
        <MainAspectsBlock />
      </main>
      <aside className="sidebar">
        <BlockWrapper title="My main criteria">
          <MainCriteriaBlock />
        </BlockWrapper>
        <BlockWrapper title="Most important subjects">
          <SubjectsBlock additionalKey="important" />
        </BlockWrapper>
        <BlockWrapper title="I like most on my company">
          <SubjectsBlock additionalKey="like" />
        </BlockWrapper>
      </aside>
    </section>
  );
}

export default CustomerOverview;
