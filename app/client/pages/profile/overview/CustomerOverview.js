import React from 'react';
import { connect } from 'react-redux';

import {
  getImportanceAspects,
  getImportanceCriteria,
  getOpinionSubjects,
  getSatisfactionSubjects
} from '../../../modules/profile/profileActions';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import MainCriteriaBlock from '../../../components/widgets/MainCriteriaBlock';
import SubjectsBlock from '../../../components/widgets/SubjectsBlock';
import MainAspectsBlock from '../../../components/widgets/mainAspects/MainAspectsBlock';
import RadarTitle from '../../../components/widgets/radar/RadarTitle';
import Radar from '../../../components/widgets/radar/Radar';
import profileSelectors from '../../../modules/profile/profileSelectors';

class CustomerOverview extends React.Component {
  componentWillMount() {
    const {
      mainAspects,
      mainCriteria,
      mainSubjects,
      mainOpinions,
      getImportanceAspects,
      getImportanceCriteria,
      getOpinionSubjects,
      getSatisfactionSubjects
    } = this.props;

    if (!mainAspects) {
      getImportanceAspects();
    }
    if (!mainCriteria) {
      getImportanceCriteria();
    }
    if (!mainSubjects) {
      getOpinionSubjects();
    }
    if (!mainOpinions) {
      getSatisfactionSubjects();
    }
  }

  render() {
    const { mainAspects, mainCriteria, mainSubjects, mainOpinions } = this.props;

    return (
      <section className="content-body">
        <main className="main">
          <BlockWrapper title={<RadarTitle />}>
            <Radar />
          </BlockWrapper>
          <MainAspectsBlock data={mainAspects} />
        </main>
        <aside className="sidebar">
          <BlockWrapper title="My main criteria">
            <MainCriteriaBlock data={mainCriteria} />
          </BlockWrapper>
          <BlockWrapper title="Most important subjects">
            <SubjectsBlock additionalKey="important" data={mainSubjects} />
          </BlockWrapper>
          <BlockWrapper title="I like most on my company">
            <SubjectsBlock additionalKey="like" data={mainOpinions} />
          </BlockWrapper>
        </aside>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  mainAspects: profileSelectors.mainAspects(state),
  mainCriteria: profileSelectors.mainCriteria(state),
  mainSubjects: profileSelectors.mainSubjects(state),
  mainOpinions: profileSelectors.mainOpinions(state)
});

export default connect(
  mapStateToProps,
  {
    getImportanceAspects,
    getImportanceCriteria,
    getOpinionSubjects,
    getSatisfactionSubjects
  }
)(CustomerOverview);
