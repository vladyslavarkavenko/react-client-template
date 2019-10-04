const tableStatus = (state) => state.staff.status;

const invitationsStatus = (state) => state.staff.invitations.status;
const invitationsData = (state) => state.staff.invitations.data;

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

  subjectList,

  getTopicsByRowId,
  getOnlyCheckedRows
};
