/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import { fetchAll, clearAll } from '../../modules/customerDashboard/customerDashboardActions';
import ShiftedHeader from '../../components/ui-components/Layout/ShiftedHeader';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import ProfileList from './ProfileList';
import RadarContainer from './RadarContainer';
import customerDashboardSelectors from '../../modules/customerDashboard/customerDashboardSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import SatisfiedContainer from './SatisfiedContainer';

class CustomerDashboard extends React.Component {
  componentDidMount() {
    const { fetchAll } = this.props;

    fetchAll();
  }

  componentWillUnmount() {
    const { clearAll } = this.props;

    clearAll();
  }

  render() {
    const { status } = this.props;

    if (status === 'request') {
      return (
        <section className="customer-dashboard">
          <ShiftedHeader title="Dashboard" />
          <section className="content-body">
            <main className="main">
              <BlockWrapper className="content-body">
                <LoaderBlock height="50vh" />
              </BlockWrapper>
            </main>
            <aside className="sidebar">
              <BlockWrapper className="content-body">
                <LoaderBlock height="50vh" />
              </BlockWrapper>
            </aside>
          </section>
        </section>
      );
    }

    return (
      <section className="customer-dashboard">
        <ShiftedHeader title="Dashboard" />
        <section className="content-body">
          <main className="main">
            <BlockWrapper title="My companies and managers">
              <ProfileList />
            </BlockWrapper>

            <RadarContainer />
          </main>
          <aside className="sidebar">
            <SatisfiedContainer />
          </aside>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  status: customerDashboardSelectors.status(state)
});

const mapDispatchToProps = {
  fetchAll,
  clearAll
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDashboard);
