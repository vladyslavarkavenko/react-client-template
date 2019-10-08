import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_TYPE } from '../../utils/constants';
import {
  saveTableField,
  changeTableRole,
  pushSendInvitations,
  selectAllRows
} from '../../modules/staff/staffActions';
import Table from './table/Table';
import staffSelectors from '../../modules/staff/staffSelectors';
import Button from '../../components/ui-components/Form/Button';

/* eslint-disable */
class StaffTable extends React.Component {
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
        <p className="table-title">Staff</p>

        <Table
          table={table}
          list={list}
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
  const table = STAFF_TABLE_TYPE.ACTIVE;
  return {
    table,
    status: staffSelectors.getTableStatus(state, table),
    list: staffSelectors.getTableData(state, table),
    errors: staffSelectors.getTableErrors(state, table),
    checked: staffSelectors.getTableChecked(state, table)
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
)(StaffTable);
