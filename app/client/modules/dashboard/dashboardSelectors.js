export default {
  staff: (state) => state.dashboard.staff.data,
  staffStatus: (state) => state.dashboard.staff.status,
  feedback: (state) => state.dashboard.feedback.data,
  feedbackStatus: (state) => state.dashboard.feedback.status,
  companyData: (state) => state.dashboard.companyData.data,
  companyDataStatus: (state) => state.dashboard.companyData.status,
  top: (state) => state.dashboard.top.data,
  topStatus: (state) => state.dashboard.top.status
};
