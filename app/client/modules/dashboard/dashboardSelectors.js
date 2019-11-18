const getTopData = (state) => state.dashboard.top.data;
const getTopStatus = (state) => state.dashboard.top.status;

const getTopByKey = (state, key) => {
  const status = getTopStatus(state);
  const data = getTopData(state);

  return {
    status: status[key],
    data: data[key]
  };
};

export default {
  staff: (state) => state.dashboard.staff.data,
  staffStatus: (state) => state.dashboard.staff.status,
  feedback: (state) => state.dashboard.feedback.data,
  feedbackStatus: (state) => state.dashboard.feedback.status,
  companyData: (state) => state.dashboard.companyData.data,
  companyDataStatus: (state) => state.dashboard.companyData.status,

  getTopByKey
};
