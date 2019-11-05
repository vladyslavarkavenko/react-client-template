import React from 'react';
import { connect } from 'react-redux';

import { getRadarScores } from '../../modules/profile/profileActions';
import Radar from '../../components/widgets/radar/Radar';
import ContentBody from '../profile/components/ContentBody';
import RadarTitle from '../../components/widgets/radar/RadarTitle';
import CtruScoreForCompany from './CtruScoreForCompany';
import CtruScoreTitleForCompany from './CtruScoreTitleForCompany';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';
import profileSelectors from '../../modules/profile/profileSelectors';
import authSelectors from '../../modules/auth/authSelectors';
import CONST from '../../utils/constants';
import StaffData from './StaffData';
import Feedback from './Feedback';
import ShiftedHeader from '../../components/ui-components/Layout/ShiftedHeader';

const {
  ROLES: { CUSTOMER, MANAGER }
} = CONST;

// TODO: Create EmptyHeader.js
// TODO: Split for different roles.

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends React.Component {
  render() {
    const { radarData, avgSatisfaction, activeRole, getRadarScores, detailsData } = this.props;

    if (activeRole === CUSTOMER || activeRole === MANAGER) {
      return (
        <div className="dashboard">
          <ShiftedHeader title="Dashboard" />
        </div>
      );
    }

    return (
      <div className="dashboard">
        <ShiftedHeader title="Dashboard" />
        <ContentBody
          main={[
            {
              title: <RadarTitle />,
              body: (
                <Radar detailsData={detailsData} getRadarScores={getRadarScores} data={radarData} />
              )
            },
            {
              title: 'Staff',
              body: <StaffData />
            },
            {
              title: 'New feedback',
              body: <Feedback />
            }
          ]}
          sidebar={[
            {
              // TODO: Insert real company name.
              title: <CtruScoreTitleForCompany />,
              body: <CtruScoreForCompany />
            },
            {
              body: <SatisfiedClients avgSatisfaction={avgSatisfaction} />,
              className: 'no-border'
            }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  radarData: profileSelectors.radarData(state),
  activeRole: authSelectors.activeRole(state),
  detailsData: profileSelectors.detailsData(state),
  avgSatisfaction: profileSelectors.avgSatisfaction(state)
});

const mapDispatchToProps = {
  getRadarScores
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
