import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_TYPE } from '../../../utils/constants';
import {
  saveTableField,
  changeTableRole,
  pushSendInvitations,
  selectAllRows
} from '../../../modules/staff/staffActions';
import Table from '../components/Table';
import staffSelectors from '../../../modules/staff/staffSelectors';
import Button from '../../../components/ui-components/Form/Button';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

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
      changeTableRole,
      pushSendInvitations,
      multipleRoles,
      status,
      errors,
      checked
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
          handleChangeRole={changeTableRole}
          multipleRoles={multipleRoles}
        />

        <div className="table-controls">
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
  selectAllRows
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationTable);
