export default function normalizeSettings(props) {
  const { ctruScore = 5, participationShare = 50, avgSatisfaction = 50, nps = 0 } = props || {};
  return {
    ctruScore,
    satisfaction: avgSatisfaction,
    participation: participationShare,
    nps
  };
}
