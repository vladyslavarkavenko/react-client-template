import React from 'react';
import { connect } from 'react-redux';
import { STAFF_TABLE_TYPE, STAFF_TABLE_STATUS } from '../../../utils/constants';
import {
  saveTableField,
  pushUsersChanges,
  setUsersStatus,
  selectAllRows
} from '../../../modules/clients/clientsActions';
import Table from '../components/Table';
import clientsSelectors from '../../../modules/clients/clientsSelectors';
import Button from '../../../components/ui-components/Form/Button';

class ClientTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
    this.handleUnblock = this.handleUnblock.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
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
    const { list, table, status, errors, checked, changed } = this.props;

    const isRequest = status === 'request';

    return (
      <div className="table-wrapper">
        <p className="table-title">Clients</p>

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
          {checked.length !== 0 && (
            <>
              <Button
                className="table-btn blocked"
                isLoading={isRequest}
                onClick={this.handleBlock}
              >
                Block
              </Button>
              <Button
                className="table-btn active"
                isLoading={isRequest}
                onClick={this.handleUnblock}
              >
                Unblock
              </Button>
            </>
          )}

          {changed.length !== 0 && (
            <>
              <Button
                className="table-btn-transparent"
                isLoading={isRequest}
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Button className="table-btn" isLoading={isRequest} onClick={this.handleSave}>
                Save
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
  return {
    table,
    status: clientsSelectors.getTableStatus(state, table),
    list: clientsSelectors.getTableData(state, table),
    errors: clientsSelectors.getTableErrors(state, table),
    checked: clientsSelectors.getOnlyCheckedRows(state, table),
    changed: clientsSelectors.getOnlyChangedRows(state, table)
  };
};

const saveChanges = pushUsersChanges.trigger;
const cancelChanges = pushUsersChanges.fulfill;

const mapDispatchToProps = {
  saveTableField,
  selectAllRows,
  setUsersStatus,
  saveChanges,
  cancelChanges
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientTable);
