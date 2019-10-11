import { FEATURES, PROPS } from '../../pages/profile/overview/const';

const { emptyData } = PROPS;
const { NAMES, ID_NAME } = FEATURES;

const names = Object.values(NAMES);

export default function parseRadarScores(aspects) {
  if (!aspects.length) {
    return emptyData;
  }

  const data = [
    names.map((x) => ({ x, y: [] })), // Importance
    names.map((x) => ({ x, y: [] })) //  Satisfaction
  ];

  aspects.forEach(({ criteria }) => {
    criteria.forEach(({ criteriaId: id, subjects }) => {
      const i = data[0].find(({ x }) => x === ID_NAME[id]).y;
      const s = data[1].find(({ x }) => x === ID_NAME[id]).y;

      subjects.forEach(({ topics }) => {
        topics.forEach(({ grades }) => {
          grades.forEach(({ importance, satisfaction }) => {
            i.push(importance);
            s.push(satisfaction);
          });
        });
      });
    });
  });

  console.log('@data', data);
  const cb = ({ x, y }) => ({ x, y: y.length ? y.reduce((a, b) => a + b) / y.length : null });

  return [data[0].map(cb), data[1].map(cb)];
}
