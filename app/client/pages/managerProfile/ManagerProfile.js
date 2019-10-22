import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';

import {
  fetchRadarScores,
  fetchTopScores,
  fetchStatistics,
  fetchComments,
  clearAll
} from '../../modules/managerProfile/managerProfileActions';
import ContentHeader from '../profile/components/ContentHeader';
import routing from '../../utils/routing';
import Overview from './overview/Overview';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import About from './about/About';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import { RATE_PROFILE_TYPE } from '../../utils/constants';

class ManagerProfile extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { match, history, manager } = this.props;
    const {
      params: { id }
    } = match;

    if (!id || !manager) {
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
    const { match, manager } = this.props;
    const {
      params: { id }
    } = match;

    if (!manager || !id) {
      // redirect at componentDidMount
      return null;
    }

    const navLinks = [
      { to: routing(id).managerProfileOverview, title: 'Overview' },
      { to: routing(id).managerProfileAbout, title: 'About' }
    ];

    const customButtons = [
      <Link
        to={routing({ id, type: RATE_PROFILE_TYPE.MANAGER }).shareOpinionWithProfile}
        className="btn btn-transparent"
        key="header_btn_share"
      >
        Share Opinion
      </Link>,
      <Link to={navLinks[1].to} className="btn btn-transparent" key="header_btn_contact">
        Contact
      </Link>
    ];

    const { firstName, lastName, avatar, avgSatisfaction } = manager;

    return (
      <section className="manager-profile">
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={`${firstName} ${lastName}`}
          subTitle={avgSatisfaction ? `${avgSatisfaction}% of clients are satisfied` : ''}
          navLinks={navLinks}
          customButtons={customButtons}
        />
        <Switch>
          <WrappedRoute exact path={routing().managerProfileAbout} component={About} />
          <WrappedRoute exact path={routing().managerProfileOverview} component={Overview} />
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
    manager: companiesSelectors.getCurrentManager(state, id)
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
)(ManagerProfile);
