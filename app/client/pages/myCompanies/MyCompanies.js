import React from 'react';
import { connect } from 'react-redux';

import Block from '../opinions/Block';
import { parseCompany } from '../opinions/helpers';
import opinionsSelectors from '../../modules/opinions/opinionsSelectors';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import { fetchCompaniesStatistics } from '../../modules/opinions/opinionsActions';
import Button from '../../components/ui-components/Form/Button';
import routing from '../../utils/routing';

class MyManagers extends React.Component {
  componentDidMount() {
    const { companiesStatistics, fetchCompaniesStatistics } = this.props;

    !companiesStatistics && fetchCompaniesStatistics();
  }

  render() {
    const { companies, companiesStatistics } = this.props;

    if (!companiesStatistics) {
      return (
        <div className="info-cards">
          <div className="empty-header">
            <h1>My companies</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="info-cards">
        <div className="empty-header">
          <h1>My companies</h1>
        </div>
        <div className="body">
          <ul>
            {companies.map((company) => {
              const { id } = company;
              const data = parseCompany(company, companiesStatistics);

              return (
                <Block key={id} shareOpinion to={routing(id).companyProfileOverview} {...data} />
              );
            })}
          </ul>
          <Button className="others-btn block-btn" title="Other companies" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companies: companiesSelectors.getCompaniesForActiveRole(state),
  companiesStatistics: opinionsSelectors.companiesStatistics(state)
});

export default connect(
  mapStateToProps,
  { fetchCompaniesStatistics }
)(MyManagers);
