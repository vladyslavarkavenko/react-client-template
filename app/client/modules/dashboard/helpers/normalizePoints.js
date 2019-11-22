import { LINE_TYPES } from './constants';

const { NPS, SATISFACTION, CTRU, PARTICIPATION } = LINE_TYPES;

export default function normalizePoints(history) {
  const ctruData = [];
  const satisfactionData = [];
  const participationData = [];
  const npsData = [];

  history.forEach((point) => {
    const date = new Date(point.date);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    const time = date.getTime();

    ctruData.push({ x: time, y: point.ctruScore, y0: 1 });
    satisfactionData.push({ x: time, y: point.avgSatisfaction, y0: 1 });
    participationData.push({ x: time, y: point.participationShare, y0: 1 });
    npsData.push({ x: time, y: point.nps, y0: 1 });
  });

  const dataMap = {
    [CTRU]: ctruData,
    [SATISFACTION]: satisfactionData,
    [PARTICIPATION]: participationData,
    [NPS]: npsData
  };

  return dataMap;
}
