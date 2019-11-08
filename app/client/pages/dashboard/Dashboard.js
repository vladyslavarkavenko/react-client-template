import React from 'react';
import { connect } from 'react-redux';

import ContentBody from '../profile/components/ContentBody';
import RadarTitle from '../../components/widgets/radar/RadarTitle';
import CtruScoreForCompany from './CtruScoreForCompany';
import SatisfiedClientsWrapper from './SatisfiedClientsWrapper';
import authSelectors from '../../modules/auth/authSelectors';
import CONST from '../../utils/constants';
import StaffData from './StaffData';
import Feedback from './Feedback';
import ShiftedHeader from '../../components/ui-components/Layout/ShiftedHeader';
import RadarWrapper from './RadarWrapper';
import TopBlock from './TopBlock';
import companiesSelectors from '../../modules/companies/companiesSelectors';

const {
  ROLES: { CUSTOMER, MANAGER }
} = CONST;

// TODO: Split for different roles.

const CtruScoreForCompanyTitle = connect((state) => ({
  companyName: companiesSelectors.getCurrentCompany(state).name
}))(({ companyName }) => <h2 className="info-block__title">cTRU score for {companyName}</h2>);

// eslint-disable-next-line react/prefer-stateless-function
const Dashboard = ({ activeRole }) => {
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
            body: <RadarWrapper />
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
            title: <CtruScoreForCompanyTitle />,
            body: <CtruScoreForCompany />
          },
          {
            className: 'no-border',
            body: <SatisfiedClientsWrapper />
          },
          {
            title: 'Top 3 by participation share',
            body: <TopBlock requestKey={1} />
          },
          {
            title: 'Top 3 by importance',
            body: <TopBlock requestKey={2} />
          },
          {
            title: 'Worst 3 by cTRU Score',
            body: <TopBlock requestKey={3} />
          }
        ]}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ activeRole: authSelectors.activeRole(state) });

export default connect(mapStateToProps)(Dashboard);
