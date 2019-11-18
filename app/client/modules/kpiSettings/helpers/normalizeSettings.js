export default function normalizeSettings(props = {}) {
  const { ctruScore = 5, participationShare = 50, avgSatisfaction = 50, nps = 0 } = props || {};

  const settings = {
    ctru: ctruScore,
    satisfaction: avgSatisfaction,
    participation: participationShare,
    nps
  };

  if (Object.prototype.hasOwnProperty.call(props, 'npsRecommendation')) {
    settings.npsRecommendation = props.npsRecommendation;
  }

  if (Object.prototype.hasOwnProperty.call(props, 'npsSatisfaction')) {
    settings.npsSatisfaction = props.npsSatisfaction;
  }

  return settings;
}
