import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';

import Overview from './overview/Overview';
import About from './about/About';
import Products from './products/Products';
import { fetchAll, clearAll } from '../../modules/companyProfile/companyProfileActions';
import { RATE_PROFILE_TYPE } from '../../utils/constants';
import ContentHeader from '../profile/components/ContentHeader';
import routing from '../../utils/routing';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import companyProfileSelectors from '../../modules/companyProfile/companyProfileSelectors';

class CompanyProfile extends React.Component {
  componentDidMount() {
    const { match, history, company, fetchAll } = this.props;
    const {
      params: { id }
    } = match;

    if (!id || !company) {
      history.push(routing().notFound);
      return;
    }

    fetchAll(id);
  }

  componentDidUpdate(prevProps) {
    const { id, fetchAll } = this.props;
    if (prevProps.id !== id) {
      fetchAll(id);
    }
  }

  componentWillUnmount() {
    const { clearAll } = this.props;
    clearAll();
  }

  render() {
    const { match, company, status } = this.props;
    const {
      params: { id }
    } = match;

    if (!company || !id) {
      // redirect at componentDidMount
      return null;
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
      <Link to={navLinks[2].to} className="btn btn-transparent" key="header_btn_contact">
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
          loc={location}
          navLinks={navLinks}
          customButtons={customButtons}
          goBack={{ to: routing().myCompanies, title: 'Companies list' }}
        />

        {status === 'request' ? (
          <LoaderBlock height="30vh" />
        ) : (
          <Switch>
            <WrappedRoute exact path={routing().companyProfileAbout} component={About} />
            <WrappedRoute exact path={routing().companyProfileOverview} component={Overview} />
            <WrappedRoute exact path={routing().companyProfileProducts} component={Products} />
          </Switch>
        )}
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
    company: companiesSelectors.getCurrentCompany(state, id),
    status: companyProfileSelectors.status(state)
  };
};

const mapDispatchToProps = {
  fetchAll,
  clearAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyProfile);
