import React from 'react';
import { connect } from 'react-redux';

import { getRadarScores } from '../../modules/profile/profileActions';
import Radar from '../../components/widgets/radar/Radar';
import ContentBody from '../profile/components/ContentBody';
import RadarTitle from '../../components/widgets/radar/RadarTitle';
import SatisfiedClients from '../../components/widgets/SatisfiedClients';
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
    const { grades, avgSatisfaction, activeRole, getRadarScores } = this.props;

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
        <div className="body">
          <ContentBody
            main={[
              {
                title: <RadarTitle />,
                body: <Radar getRadarScores={getRadarScores} data={grades} />
              }
            ]}
            sidebar={[
              {
                body: <SatisfiedClients avgSatisfaction={avgSatisfaction} />
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  grades: profileSelectors.grades(state),
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
