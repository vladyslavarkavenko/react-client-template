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
    const { invitationList, table, changeTableRole, pushSendInvitations } = this.props;

    return (
      <>
        <p className="table-title">Invitations</p>

        <Table
          table={table}
          list={invitationList}
          handleEdit={this.handleEdit}
          handleChangeRole={changeTableRole}
        />

        <Button onClick={() => pushSendInvitations()}>Send</Button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  table: STAFF_TABLE_TYPE.INVITATION,
  invitationList: staffSelectors.invitationsData(state)
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
