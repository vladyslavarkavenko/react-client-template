export default function normalizeSettings(props) {
  const { ctruScore = 5, participationShare = 50, satisfaction = 50, nps = 0 } = props || {};
  return {
    ctruScore,
    satisfaction,
    participation: participationShare,
    nps
  };
}
