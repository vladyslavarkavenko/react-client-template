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
class PendingTable extends React.Component {
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
    const { list, table, changeTableRole, status, errors } = this.props;

    const isRequest = status === 'request';

    return (
      <div className="table-wrapper">
        <p className="table-title">Pending</p>

        <Table
          table={table}
          list={list}
          errors={errors}
          isRequest={isRequest}
          handleEdit={this.handleEdit}
          handleChangeRole={changeTableRole}
          readOnly
        />

        <div className="table-controls">
          <Button className="table-btn" isLoading={isRequest}>
            Resend Invite
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const table = STAFF_TABLE_TYPE.PENDING;
  return {
    table,
    status: staffSelectors.getTableStatus(state, table),
    list: staffSelectors.getTableData(state, table),
    errors: staffSelectors.getTableErrors(state, table)
  };
};

const mapDispatchToProps = {
  saveTableField,
  changeTableRole,
  pushSendInvitations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTable);
