import { DATE_OFFSET } from './constants';

export default function normalizePoints(history, dateOffset) {
  const importance = [];
  const satisfaction = [];

  history.forEach((point) => {
    const date = new Date(point.date);

    if (dateOffset === DATE_OFFSET.YEAR) {
      date.setDate(1);
    }

    date.setHours(0, 0, 0, 0);

    const time = date.getTime();

    importance.push({
      x: time,
      y0: 1,
      y: point.importance
    });

    satisfaction.push({
      x: time,
      y0: 1,
      y: point.satisfaction
    });
  });

  return { importance, satisfaction };
}
