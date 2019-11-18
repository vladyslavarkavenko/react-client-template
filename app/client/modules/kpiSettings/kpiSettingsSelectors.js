const getSettingsStatus = (state) => state.kpiSettings.settings.status;
const getSettingsTarget = (state) => state.kpiSettings.settings.target;
const getSettingsActual = (state) => state.kpiSettings.settings.actual;

const getInput = (state) => state.kpiSettings.input;

const getCtru = (state) => state.kpiSettings.input.ctru;
const getSatisfaction = (state) => state.kpiSettings.input.satisfaction;
const getParticipation = (state) => state.kpiSettings.input.participation;
const getNPS = (state) => state.kpiSettings.input.nps;

const isChanged = (state) => {
  const { satisfaction, ctru, participation, nps } = getSettingsTarget(state);

  const isSatisfactionChanged = satisfaction !== getSatisfaction(state);
  const isCtruScoreChanged = ctru !== getCtru(state);
  const isParticipationChanged = participation !== getParticipation(state);
  const isNpsChanged = nps !== getNPS(state);

  return isCtruScoreChanged || isSatisfactionChanged || isParticipationChanged || isNpsChanged;
};

export default {
  getSettingsStatus,
  getSettingsTarget,
  getSettingsActual,
  getInput,

  getCtru,
  getSatisfaction,
  getParticipation,
  getNPS,

  isChanged
};
