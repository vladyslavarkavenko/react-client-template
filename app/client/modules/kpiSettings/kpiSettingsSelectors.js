const getSettingsStatus = (state) => state.kpiSettings.settings.status;
const getSettingsData = (state) => state.kpiSettings.settings.data;

const getCtru = (state) => state.kpiSettings.input.ctru;
const getSatisfaction = (state) => state.kpiSettings.input.satisfaction;
const getParticipation = (state) => state.kpiSettings.input.participation;
const getNPS = (state) => state.kpiSettings.input.nps;

export default {
  getSettingsStatus,
  getSettingsData,

  getCtru,
  getSatisfaction,
  getParticipation,
  getNPS
};
