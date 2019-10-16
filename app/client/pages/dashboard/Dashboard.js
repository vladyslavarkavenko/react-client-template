import React from 'react';
import { connect } from 'react-redux';

import { getRadarScores } from '../../modules/profile/profileActions';
import Radar from '../profile/overview/Radar';
import ContentBody from '../profile/components/ContentBody';
import RadarTitle from '../profile/overview/RadarTitle';
import SatisfiedClients from '../profile/overview/SatisfiedClients';
import profileSelectors from '../../modules/profile/profileSelectors';
import authSelectors from '../../modules/auth/authSelectors';
import CONST from '../../utils/constants';

const {
  ROLES: { CUSTOMER, MANAGER }
} = CONST;

// TODO: Create EmptyHeader.js
// TODO: Split for different roles.

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends React.Component {
  render() {
    const { radarData, avgSatisfaction, activeRole, getRadarScores } = this.props;

    if (activeRole === CUSTOMER || activeRole === MANAGER) {
      return (
        <div className="dashboard">
          <div className="empty-header">
            <h1>Dashboard</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="empty-header">
          <h1>Dashboard</h1>
        </div>
        <ContentBody
          main={[
            {
              title: <RadarTitle />,
              body: <Radar getRadarScores={getRadarScores} data={radarData} />
            }
          ]}
          sidebar={[
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
  avgSatisfaction: profileSelectors.avgSatisfaction(state)
});

const mapDispatchToProps = {
  getRadarScores
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
