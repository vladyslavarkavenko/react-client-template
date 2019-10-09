import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import {
  fetchRadarScores,
  fetchSatisfiedClients
} from '../../modules/companyProfile/companyProfileActions';
import ContentHeader from '../profile/components/ContentHeader';
import routing from '../../utils/routing';
import Overview from './overview/Overview';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import About from './about/About';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import companyProfileSelectors from '../../modules/companyProfile/companyProfileSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { match, history, company } = this.props;
    const {
      params: { id }
    } = match;

    if (!id || !company) {
      history.push(routing().notFound);
      return;
    }

    this.fetchData(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (prevProps.id !== id) {
      this.fetchData(id);
    }
  }

  fetchData(id) {
    const { fetchSatisfiedClients, fetchRadarScores } = this.props;

    fetchSatisfiedClients(id);
    fetchRadarScores(id);
  }

  render() {
    const { match, company, satisfaction } = this.props;
    const {
      params: { id }
    } = match;

    if (!company || !id) {
      // redirect at componentDidMount
      return <LoaderBlock height="50vh" />;
    }

    const navLinks = [
      { to: routing(id).companyProfileOverview, title: 'Overview' },
      { to: routing(id).companyProfileAbout, title: 'About' }
    ];

    const { name, avatar } = company;

    return (
      <section className="manager-profile">
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={name}
          subTitle={
            satisfaction
              ? `${satisfaction}% of clients are satisfied`
              : 'Loading client satisfaction...'
          }
          navLinks={navLinks}
        />
        <Switch>
          <WrappedRoute exact path={routing().companyProfileAbout} component={About} />
          <WrappedRoute exact path={routing().companyProfileOverview} component={Overview} />
        </Switch>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const {
    params: { id, tab }
  } = match;

  const satisfaction = companyProfileSelectors.satisfaction(state);

  return {
    id,
    tab,
    company: companiesSelectors.getCurrentCompany(state, id),
    satisfaction: satisfaction.data
  };
};

const mapDispatchToProps = {
  fetchSatisfiedClients,
  fetchRadarScores
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyProfile);
