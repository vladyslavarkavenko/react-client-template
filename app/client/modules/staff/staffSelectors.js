const tableStatus = (state) => state.staff.status;

const getTableData = (state, table) => state.staff[table.toLowerCase()].data;
const getTableStatus = (state, table) => state.staff[table.toLowerCase()].status;
const getTableErrors = (state, table) => state.staff[table.toLowerCase()].errors;

const subjectList = (state) => state.staff.subjectList;
const getTopicsByRowId = (state, { id, table }) => {
  const row = getTableData(state, table).find((item) => item.id === id);

  return row !== -1 ? row.topics : [];
};

const getOnlyCheckedRows = (state, table) =>
  state.staff[table].data.filter((item) => item.isChecked);

export default {
  tableStatus,

  getTableData,
  getTableStatus,
  getTableErrors,

  subjectList,

  getTopicsByRowId,
  getOnlyCheckedRows
};
