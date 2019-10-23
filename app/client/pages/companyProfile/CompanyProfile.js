import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';

import {
  fetchRadarScores,
  fetchTopScores,
  fetchStatistics,
  fetchComments,
  clearAll
} from '../../modules/companyProfile/companyProfileActions';
import { RATE_PROFILE_TYPE } from '../../utils/constants';
import ContentHeader from '../profile/components/ContentHeader';
import routing from '../../utils/routing';
import Overview from './overview/Overview';
import About from './about/About';
import Products from './products/Products';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import companiesSelectors from '../../modules/companies/companiesSelectors';
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

  componentWillUnmount() {
    const { clearAll } = this.props;
    clearAll();
  }

  fetchData(id) {
    const { fetchRadarScores, fetchTopScores, fetchStatistics, fetchComments } = this.props;

    fetchRadarScores(id);
    fetchTopScores(id);
    fetchStatistics(id);
    fetchComments(id);
  }

  render() {
    const { match, company } = this.props;
    const {
      params: { id }
    } = match;

    if (!company || !id) {
      // redirect at componentDidMount
      return <LoaderBlock height="50vh" />;
    }

    const navLinks = [
      { to: routing(id).companyProfileOverview, title: 'Overview' },
      { to: routing(id).companyProfileProducts, title: 'Services & Products' },
      { to: routing(id).companyProfileAbout, title: 'About' }
    ];

    const customButtons = [
      <Link
        to={routing({ id, type: RATE_PROFILE_TYPE.COMPANY }).shareOpinionWithProfile}
        className="btn btn-transparent"
        key="header_btn_share"
      >
        Share Opinion
      </Link>,
      <Link to={navLinks[1].to} className="btn btn-transparent" key="header_btn_contact">
        Contact
      </Link>
    ];

    const { name, avatar, avgSatisfaction, location } = company;

    return (
      <section className="manager-profile">
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={name}
          subTitle={avgSatisfaction ? `${avgSatisfaction}% of clients are satisfied` : ''}
          location={location}
          navLinks={navLinks}
          customButtons={customButtons}
        />
        <Switch>
          <WrappedRoute exact path={routing().companyProfileAbout} component={About} />
          <WrappedRoute exact path={routing().companyProfileOverview} component={Overview} />
          <WrappedRoute exact path={routing().companyProfileProducts} component={Products} />
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

  return {
    id,
    tab,
    company: companiesSelectors.getCurrentCompany(state, id)
  };
};

const mapDispatchToProps = {
  fetchRadarScores,
  fetchTopScores,
  fetchStatistics,
  fetchComments,
  clearAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyProfile);
