const getSettingsStatus = (state) => state.kpiSettings.settings.status;
const getSettingsData = (state) => state.kpiSettings.settings.data;

const getCtru = (state) => state.kpiSettings.input.ctru;
const getSatisfaction = (state) => state.kpiSettings.input.satisfaction;
const getParticipation = (state) => state.kpiSettings.input.participation;
const getNPS = (state) => state.kpiSettings.input.nps;

const isChanged = (state) => {
  const { satisfaction, ctruScore, participation, nps } = getSettingsData(state);

  const isSatisfactionChanged = satisfaction !== getSatisfaction(state);
  const isCtruScoreChanged = ctruScore !== getCtru(state);
  const isParticipationChanged = participation !== getParticipation(state);
  const isNpsChanged = nps !== getNPS(state);

  return isCtruScoreChanged || isSatisfactionChanged || isParticipationChanged || isNpsChanged;
};

export default {
  getSettingsStatus,
  getSettingsData,

  getCtru,
  getSatisfaction,
  getParticipation,
  getNPS,

  isChanged
};
