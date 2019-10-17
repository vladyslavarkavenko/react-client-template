const tableStatus = (state) => state.clients.status;

const getTableData = (state, table) => state.clients[table.toLowerCase()].data;
const getTableStatus = (state, table) => state.clients[table.toLowerCase()].status;
const getTableErrors = (state, table) => state.clients[table.toLowerCase()].errors;

const getManagers = (state) => state.clients.managers;

const getManagerByRowId = (state, { id, table }) => {
  const row = getTableData(state, table).find((item) => item.id === id);

  if (row) {
    if (row._changes && row._changes.manager) {
      return row._changes.topics;
    }

    return row.manager;
  }

  return null;
};

const getOnlyCheckedRows = (state, table) =>
  state.clients[table.toLowerCase()].data.filter((item) => item.isChecked);

const getOnlyCheckedWithStatusRows = (state, table, status) =>
  state.clients[table.toLowerCase()].data.filter(
    (item) => item.isChecked && item.status === status
  );

const getOnlyChangedRows = (state, table) =>
  state.clients[table.toLowerCase()].data.filter((item) => item._changes);

const getCheckedAndChangedRows = (state, table) =>
  state.clients[table.toLowerCase()].data.filter((item) => item.isChecked && item._changes);

export default {
  tableStatus,

  getTableData,
  getTableStatus,
  getTableErrors,

  getManagers,
  getManagerByRowId,

  getOnlyCheckedRows,
  getOnlyChangedRows,
  getCheckedAndChangedRows,
  getOnlyCheckedWithStatusRows
};
