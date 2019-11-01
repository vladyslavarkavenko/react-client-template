import { CATEGORIES, FEATURES, PROPS } from '../../components/widgets/radar/const';

const { emptyData } = PROPS;
const { NAMES, ID_NAME: F_ID_NAME } = FEATURES;
const { ID_NAME: C_ID_NAME } = CATEGORIES;

const names = Object.values(NAMES);

export default function parseRadarScores(aspects) {
  if (!aspects.length) {
    return emptyData;
  }

  const data = [
    names.map((feature) => ({
      x: feature,
      y: []
    })), // Importance
    names.map((feature) => ({
      x: feature,
      y: []
    })) //  Satisfaction
  ];

  const categoriesDetails = {};
  const featuresDetails = {};

  aspects.forEach(
    ({ aspectId: aId, criteria, numberGrades: aCount, participationShare: aParticipation }) => {
      const category = C_ID_NAME[aId];

      categoriesDetails[category] = {
        count: aCount,
        participation: aParticipation
      };

      criteria.forEach(
        ({ criteriaId: cId, topics, numberGrades: cCount, participationShare: cParticipation }) => {
          const feature = F_ID_NAME[cId];

          featuresDetails[feature] = {
            count: cCount,
            participation: cParticipation
          };

          const i = data[0].find(({ x }) => x === feature).y;
          const s = data[1].find(({ x }) => x === feature).y;

          topics.forEach(({ grades }) => {
            grades.forEach(({ importance, satisfaction }) => {
              i.push(importance);
              s.push(satisfaction);
            });
          });
        }
      );
    }
  );

  const cb = ({ x, y }) => ({
    x,
    y: y.length ? y.reduce((a, b) => a + b) / y.length : null
  });

  return {
    grades: [data[0].map(cb), data[1].map(cb)],
    categoriesDetails,
    featuresDetails
  };
}
