import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_TYPE } from '../../../utils/constants';
import {
  saveTableField,
  changeTableRole,
  pushSendInvitations,
  selectAllRows,
  pushResendInvitations
} from '../../../modules/staff/staffActions';
import Table from '../components/Table';
import staffSelectors from '../../../modules/staff/staffSelectors';
import Button from '../../../components/ui-components/Form/Button';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

class PendingTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  handleEdit({ currentTarget }) {
    const { table, saveTableField } = this.props;
    const { dataset, checked } = currentTarget;
    const { id, field } = dataset;

    saveTableField({
      table,
      id: Number(id),
      field,
      value: checked
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
      checked,
      changeTableRole,
      status,
      errors,
      multipleRoles,
      pushResendInvitations
    } = this.props;

    const isRequest = status === 'request';

    return (
      <div className="table-wrapper">
        <p className="table-title">Pending</p>

        <Table
          table={table}
          list={list}
          checked={checked}
          errors={errors}
          isRequest={isRequest}
          handleEdit={this.handleEdit}
          handleSelectAll={this.handleSelectAll}
          handleChangeRole={changeTableRole}
          multipleRoles={multipleRoles}
          readOnly
        />

        <div className="table-controls">
          {checked.length !== 0 && (
            <Button
              className="table-btn"
              isLoading={isRequest}
              onClick={() => pushResendInvitations()}
            >
              Resend Invites
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const table = STAFF_TABLE_TYPE.PENDING;

  const multipleRoles = companiesSelectors.getCurrentCompany(state).hasAllAccess;
  return {
    table,
    multipleRoles,
    status: staffSelectors.getTableStatus(state, table),
    list: staffSelectors.getTableData(state, table),
    errors: staffSelectors.getTableErrors(state, table),
    checked: staffSelectors.getOnlyCheckedRows(state, table)
  };
};

const mapDispatchToProps = {
  saveTableField,
  changeTableRole,
  pushSendInvitations,
  selectAllRows,
  pushResendInvitations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTable);
