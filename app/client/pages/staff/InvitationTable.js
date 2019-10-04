import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_TYPE } from '../../utils/constants';
import {
  saveTableField,
  changeTableRole,
  pushSendInvitations
} from '../../modules/staff/staffActions';
import Table from './Table';
import staffSelectors from '../../modules/staff/staffSelectors';
import Button from '../../components/ui-components/Form/Button';

/* eslint-disable */
class InvitationTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit({ currentTarget }) {
    const { table, saveTableField } = this.props;
    const { value, dataset, checked } = currentTarget;
    const { id, field } = dataset;

    saveTableField({
      table,
      id,
      field,
      value: currentTarget.type === 'checkbox' ? checked : value
    });
  }

  render() {
    const { list, table, changeTableRole, pushSendInvitations, status, errors } = this.props;

    const isRequest = status === 'request';

    return (
      <div className="table-wrapper">
        <p className="table-title">Invitations</p>

        <Table
          table={table}
          list={list}
          errors={errors}
          isRequest={isRequest}
          handleEdit={this.handleEdit}
          handleChangeRole={changeTableRole}
        />

        <div className="table-controls">
          <Button className="table-btn" onClick={() => pushSendInvitations()} isLoading={isRequest}>
            Send Invite
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  table: STAFF_TABLE_TYPE.INVITATION,
  status: staffSelectors.invitationsStatus(state),
  list: staffSelectors.invitationsData(state),
  errors: staffSelectors.invitationsErrors(state)
});

const mapDispatchToProps = {
  saveTableField,
  changeTableRole,
  pushSendInvitations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationTable);
