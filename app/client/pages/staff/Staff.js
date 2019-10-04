import React from 'react';
import { connect } from 'react-redux';
import { fetchStaffTables } from '../../modules/staff/staffActions';
import staffSelectors from '../../modules/staff/staffSelectors';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';
import InvitationTable from './InvitationTable';

/* eslint-disable */
class Staff extends React.Component {
  componentDidMount() {
    this.props.fetchStaffTables();
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
      <div className="content staff">
        {/*Staff page*/}
        <section className="table-list">
          <InvitationTable />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableStatus: staffSelectors.tableStatus(state)
});

const mapDispatchToProps = {
  fetchStaffTables
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff);
