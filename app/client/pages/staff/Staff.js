import React from 'react';
import { connect } from 'react-redux';
import { fetchStaffTables, clearAll } from '../../modules/staff/staffActions';
import staffSelectors from '../../modules/staff/staffSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import InvitationTable from './invitationTable/InvitationTable';
import PendingTable from './pendingTable/PendingTable';
import StaffTable from './staffTable/StaffTable';

class Staff extends React.Component {
  componentDidMount() {
    const { fetchStaffTables } = this.props;
    fetchStaffTables();
  }

  componentWillUnmount() {
    const { clearAll } = this.props;
    clearAll();
  }

  render() {
    const { tableStatus } = this.props;

    if (tableStatus === 'request') {
      return (
        <div className="content staff">
          <LoaderBlock />
        </div>
      );
    }

    return (
      <div className="staff">
        <section className="table-list">
          <InvitationTable />
          <PendingTable />
          <StaffTable />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableStatus: staffSelectors.tableStatus(state)
});

const mapDispatchToProps = {
  fetchStaffTables,
  clearAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff);
