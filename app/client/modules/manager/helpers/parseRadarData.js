import { FEATURES } from '../../../pages/profile/overview/const';

const {
  CARING,
  CLEAR,
  COMPENSATING,
  CONFIDENT,
  CONVENIENT,
  COST_CONSCIOUS,
  COURTEGIOUS,
  CREATIVE
} = FEATURES.NAMES;
const names = Object.values(FEATURES.NAMES);

const mapIdName = {
  1: CARING,
  2: CONVENIENT,
  3: CREATIVE,
  4: CLEAR,
  5: COST_CONSCIOUS,
  6: COMPENSATING,
  7: CONFIDENT,
  8: COURTEGIOUS
};

export default function parseRadarData(criteria) {
  if (!criteria.length) {
    return null;
  }

  const data = [
    names.map((x) => ({ x, y: [] })), // Importance
    names.map((x) => ({ x, y: [] })) //  Satisfaction
  ];

  criteria.forEach(({ criteriaId: id, subjects }) => {
    const i = data[0].find(({ x }) => x === mapIdName[id]).y;
    const s = data[1].find(({ x }) => x === mapIdName[id]).y;

    subjects.forEach(({ topics }) => {
      topics.forEach(({ grades }) => {
        grades.forEach(({ importance, satisfaction }) => {
          i.push(importance);
          s.push(satisfaction);
        });
      });
    });
  });

  const cb = ({ x, y }) => ({ x, y: y.length ? y.reduce((a, b) => a + b) / y.length : null });

  return [data[0].map(cb), data[1].map(cb)];
}
