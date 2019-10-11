const tableStatus = (state) => state.clients.status;

const getTableData = (state, table) => state.clients[table.toLowerCase()].data;
const getTableStatus = (state, table) => state.clients[table.toLowerCase()].status;
const getTableErrors = (state, table) => state.clients[table.toLowerCase()].errors;

const getManagers = (state) => state.clients.managers;

const getTopicsByRowId = (state, { id, table }) => {
  const row = getTableData(state, table).find((item) => item.id === id);

  if (row) {
    if (row._changes && row._changes.topics) {
      return row._changes.topics;
    }

    return row.topics;
  }

  return [];
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

  getTopicsByRowId,
  getOnlyCheckedRows,
  getOnlyChangedRows,
  getCheckedAndChangedRows,
  getOnlyCheckedWithStatusRows
};
