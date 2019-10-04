const tableStatus = (state) => state.staff.status;

const invitationsStatus = (state) => state.staff.invitations.status;
const invitationsData = (state) => state.staff.invitations.data;
const invitationsErrors = (state) => state.staff.invitations.errors;

const pendingStatus = (state) => state.staff.pending.status;
const pendingData = (state) => state.staff.pending.data;
const pendingErrors = (state) => state.staff.pending.errors;

const subjectList = (state) => state.staff.subjectList;
const getTopicsByRowId = (state, id) => {
  const row = invitationsData(state).find((item) => item.id === id);

  return row !== -1 ? row.topics : [];
};

const getOnlyCheckedRows = (state, table) =>
  state.staff[table].data.filter((item) => item.isChecked);

export default {
  tableStatus,

  invitationsStatus,
  invitationsData,
  invitationsErrors,

  pendingStatus,
  pendingData,
  pendingErrors,

  subjectList,

  getTopicsByRowId,
  getOnlyCheckedRows
};
