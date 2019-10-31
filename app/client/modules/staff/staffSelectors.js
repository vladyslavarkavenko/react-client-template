const tableStatus = (state) => state.staff.status;

const getTableData = (state, table) => state.staff[table.toLowerCase()].data;
const getTableStatus = (state, table) => state.staff[table.toLowerCase()].status;
const getTableErrors = (state, table) => state.staff[table.toLowerCase()].errors;

const subjectList = (state) => state.staff.subjectList;
const subjectListNormalized = (state) => state.staff.subjectListNormalized;
const getSubjectsByRowId = (state, { id, table }) => {
  const row = getTableData(state, table).find((item) => item.id === id);

  if (row) {
    if (row._changes && row._changes.subjects) {
      return row._changes.subjects;
    }

    return row.subjects;
  }

  return [];
};

const getOnlyCheckedRows = (state, table) =>
  state.staff[table.toLowerCase()].data.filter((item) => item.isChecked);

const getOnlyChangedRows = (state, table) =>
  state.staff[table.toLowerCase()].data.filter((item) => item._changes);

const getCheckedAndChangedRows = (state, table) =>
  state.staff[table.toLowerCase()].data.filter((item) => item.isChecked && item._changes);

export default {
  tableStatus,

  getTableData,
  getTableStatus,
  getTableErrors,

  subjectList,
  subjectListNormalized,

  getSubjectsByRowId,
  getOnlyCheckedRows,
  getOnlyChangedRows,
  getCheckedAndChangedRows
};
