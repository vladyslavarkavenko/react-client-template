import React from 'react';
import { connect } from 'react-redux';

import Block from './Block';
import parseData from './helpers';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import authSelectors from '../../modules/auth/authSelectors';
import {
  fetchStaffStatistics,
  fetchCompaniesStatistics
} from '../../modules/opinions/opinionsActions';
import opinionsSelectors from '../../modules/opinions/opinionsSelectors';
import routing from '../../utils/routing';

class Opinions extends React.Component {
  componentDidMount() {
    const {
      staffStatistics,
      fetchStaffStatistics,
      companiesStatistics,
      fetchCompaniesStatistics
    } = this.props;

    !staffStatistics && fetchStaffStatistics();
    !companiesStatistics && fetchCompaniesStatistics();
  }

  render() {
    const { companies, staffStatistics, companiesStatistics } = this.props;

    if (!staffStatistics || !companiesStatistics) {
      return (
        <div className="info-cards">
          <div className="empty-header">
            <h1>Opinions</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="info-cards">
        <div className="empty-header">
          <h1>Opinions</h1>
        </div>
        <div className="body">
          <ul>
            {parseData(companies, staffStatistics, companiesStatistics).map((datum) => {
              const { id, type } = datum;
              return <Block key={datum.id} to={routing({ id, type }).opinionDetails} {...datum} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeRole: authSelectors.activeRole(state),
  staffStatistics: opinionsSelectors.staffStatistics(state),
  companies: companiesSelectors.getCompaniesForActiveRole(state),
  companiesStatistics: opinionsSelectors.companiesStatistics(state)
});

export default connect(
  mapStateToProps,
  { fetchStaffStatistics, fetchCompaniesStatistics }
)(Opinions);
