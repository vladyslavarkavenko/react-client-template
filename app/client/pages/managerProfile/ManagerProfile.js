import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';

import { fetchAll, clearAll } from '../../modules/managerProfile/managerProfileActions';
import ContentHeader from '../profile/components/ContentHeader';
import routing from '../../utils/routing';
import Overview from './overview/Overview';
import WrappedRoute from '../../components/Wrappers/WrappedRoute';
import About from './about/About';
import { RATE_PROFILE_TYPE } from '../../utils/constants';
import managerProfileSelectors from '../../modules/managerProfile/managerProfileSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class ManagerProfile extends React.Component {
  componentDidMount() {
    const { match, history, manager, status, fetchAll } = this.props;
    const {
      params: { id }
    } = match;

    if (!id || (!manager && status === 'success')) {
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
    const { match, manager, status } = this.props;
    const {
      params: { id }
    } = match;

    if (status === 'request') {
      return <LoaderBlock height="50vh" />;
    }

    if (!id || !manager) {
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

    const { name, avatar, avgSatisfaction, location } = manager;

    return (
      <section className="manager-profile">
        <ContentHeader
          displayAvatar
          avatar={avatar}
          title={name}
          loc={location}
          subTitle={avgSatisfaction ? `${avgSatisfaction}% of clients are satisfied` : ''}
          navLinks={navLinks}
          customButtons={customButtons}
          goBack={{ to: routing().myManagers, title: 'Managers list' }}
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
    manager: managerProfileSelectors.manager(state).data,
    status: managerProfileSelectors.status(state)
  };
};

const mapDispatchToProps = {
  fetchAll,
  clearAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerProfile);
