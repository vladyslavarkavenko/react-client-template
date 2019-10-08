import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_TYPE, STAFF_TABLE_STATUS } from '../../../utils/constants';
import {
  saveTableField,
  changeTableRole,
  pushUsersChanges,
  setUsersStatus,
  selectAllRows
} from '../../../modules/staff/staffActions';
import Table from '../components/Table';
import staffSelectors from '../../../modules/staff/staffSelectors';
import Button from '../../../components/ui-components/Form/Button';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

/* eslint-disable */
class StaffTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
    this.handleUnblock = this.handleUnblock.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  handleEdit({ currentTarget }) {
    const { table, saveTableField } = this.props;
    const { value, dataset, checked } = currentTarget;
    const { id, field } = dataset;

    saveTableField({
      table,
      field,
      id: Number(id),
      value: currentTarget.type === 'checkbox' ? checked : value
    });
  }

  handleBlock() {
    const { table, setUsersStatus } = this.props;
    setUsersStatus({
      table,
      status: STAFF_TABLE_STATUS.BLOCKED
    });
  }

  handleUnblock() {
    const { table, setUsersStatus } = this.props;
    setUsersStatus({
      table,
      status: STAFF_TABLE_STATUS.ACTIVE
    });
  }

  handleSave() {
    const { table, saveChanges } = this.props;
    saveChanges({ table });
  }

  handleCancel() {
    const { table, cancelChanges } = this.props;
    cancelChanges({ table });
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
      multipleRoles,
      status,
      errors,
      checked,
      changed
    } = this.props;

    const isRequest = status === 'request';

    return (
      <div className="table-wrapper">
        <p className="table-title">Staff</p>

        <Table
          onlyDropEdit
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
          {changed.length !== 0 && (
            <>
              <Button className="table-btn" isLoading={isRequest} onClick={this.handleSave}>
                Save
              </Button>
              <Button className="table-btn" isLoading={isRequest} onClick={this.handleCancel}>
                Cancel
              </Button>
            </>
          )}

          {checked.length !== 0 && (
            <>
              <Button className="table-btn" isLoading={isRequest} onClick={this.handleBlock}>
                Block
              </Button>
              <Button className="table-btn" isLoading={isRequest} onClick={this.handleUnblock}>
                Unblock
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const table = STAFF_TABLE_TYPE.ACTIVE;
  const multipleRoles = companiesSelectors.getCurrentCompany(state).hasAllAccess;
  return {
    table,
    multipleRoles,
    status: staffSelectors.getTableStatus(state, table),
    list: staffSelectors.getTableData(state, table),
    errors: staffSelectors.getTableErrors(state, table),
    checked: staffSelectors.getOnlyCheckedRows(state, table),
    changed: staffSelectors.getOnlyChangedRows(state, table)
  };
};

const saveChanges = pushUsersChanges.trigger;
const cancelChanges = pushUsersChanges.fulfill;

const mapDispatchToProps = {
  saveTableField,
  changeTableRole,
  selectAllRows,
  setUsersStatus,
  saveChanges,
  cancelChanges
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffTable);
