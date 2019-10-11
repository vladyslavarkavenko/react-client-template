import React from 'react';
import { STAFF_TABLE_STATUS } from '../../../utils/constants';

export default function StatusLabel({ status }) {
  switch (status) {
    case STAFF_TABLE_STATUS.PENDING:
      return <span className="status-label pending">Pending</span>;

    case STAFF_TABLE_STATUS.EXPIRED:
      return <span className="status-label expired">Expired</span>;

    case STAFF_TABLE_STATUS.ACTIVE:
      return <span className="status-label active">Active</span>;

    case STAFF_TABLE_STATUS.BLOCKED:
      return <span className="status-label blocked">Blocked</span>;

    default:
      return <span className="status-label">None</span>;
  }
}
