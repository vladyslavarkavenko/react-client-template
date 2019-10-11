/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_STATUS, STAFF_TABLE_TYPE } from '../../../utils/constants';
import {
  saveTableField,
  pushSendInvitations,
  pushResendInvitations,
  selectAllRows,
  createNewRow
} from '../../../modules/clients/clientsActions';
import Table from '../components/Table';
import clientsSelectors from '../../../modules/clients/clientsSelectors';
import Button from '../../../components/ui-components/Form/Button';

class InvitationTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
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

  handleSelectAll({ currentTarget }) {
    const { table, selectAllRows } = this.props;
    const { checked } = currentTarget;
    selectAllRows({ table, checked });
  }

  render() {
    const {
      list,
      table,
      pushSendInvitations,
      status,
      errors,
      checked,
      expiredChecked,
      createNewRow,
      pushResendInvitations
    } = this.props;

    const isRequest = status === 'request';

    return (
      <div className="table-wrapper">
        <p className="table-title">Invitations</p>

        <Table
          table={table}
          list={list}
          checked={checked}
          errors={errors}
          isRequest={isRequest}
          handleSelectAll={this.handleSelectAll}
          handleEdit={this.handleEdit}
        />

        <div className="table-controls">
          <Button
            className="table-btn-transparent"
            onClick={() => createNewRow()}
            disabled={isRequest}
          >
            + Add a row
          </Button>

          {expiredChecked.length !== 0 && (
            <Button
              className="table-btn"
              onClick={() => pushResendInvitations()}
              isLoading={isRequest}
            >
              Resend Invite
            </Button>
          )}

          {checked.length !== 0 && (
            <Button
              className="table-btn"
              onClick={() => pushSendInvitations()}
              isLoading={isRequest}
            >
              Send Invite
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const table = STAFF_TABLE_TYPE.INVITATIONS;
  return {
    table,
    status: clientsSelectors.getTableStatus(state, table),
    list: clientsSelectors.getTableData(state, table),
    errors: clientsSelectors.getTableErrors(state, table),
    checked: clientsSelectors.getOnlyCheckedRows(state, table),
    expiredChecked: clientsSelectors.getOnlyCheckedWithStatusRows(
      state,
      STAFF_TABLE_TYPE.INVITATIONS,
      STAFF_TABLE_STATUS.EXPIRED
    )
  };
};

const mapDispatchToProps = {
  saveTableField,
  pushSendInvitations,
  pushResendInvitations,
  selectAllRows,
  createNewRow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationTable);
