import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import { fetchRadarScores, fetchSatisfiedClients } from '../../modules/manager/managerActions';
import ContentHeader from '../profile/components/ContentHeader';
import routing from '../../utils/routing';
import Overview from './overview/Overview';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import About from './about/About';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import managerSelectors from '../../modules/manager/managerSelectors';

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

  fetchData(id) {
    const { fetchSatisfiedClients, fetchRadarScores } = this.props;

    fetchSatisfiedClients(id);
    fetchRadarScores(id);
  }

  render() {
    const { match, manager, satisfaction } = this.props;
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

    const { firstName, lastName, avatar } = manager;

    return (
      <section className="manager-profile">
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={`${firstName} ${lastName}`}
          subTitle={`${satisfaction}% of clients are satisfied`}
          navLinks={navLinks}
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

  const satisfaction = managerSelectors.satisfaction(state);

  return {
    id,
    tab,
    manager: companiesSelectors.getCurrentManager(state, id),
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
)(ManagerProfile);
