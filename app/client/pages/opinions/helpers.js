import { RATE_PROFILE_TYPE } from '../../utils/constants';

const { MANAGER, COMPANY } = RATE_PROFILE_TYPE;

// prettier-ignore
const colors = [
  [6, 200, 155],
  [245, 123, 123],
  [255, 150, 10],
  [190, 120, 230],
  [90, 170, 220]
];

const parseScores = (scores) =>
  scores.map(({ name, ctruScore }, i) => ({
    grade: Math.floor(ctruScore * 10) / 10,
    topic: name,
    color: colors[i]
  }));

export function parseManager(manager, statistics) {
  const { id, firstName, lastName, title, avatar, confirmed = true, avgSatisfaction } = manager;

  const { numberOpinions: count, ctruScore: score, topFiveScores } = statistics[id];

  return {
    id,
    score: Math.floor(score * 10) / 10,
    count,
    name: `${firstName} ${lastName}`,
    title,
    avatar: avatar || '/assets/img/empty-avatar.jpg',
    confirmed,
    grades: parseScores(topFiveScores),
    type: MANAGER,
    description: `${avgSatisfaction}% of the clients are satisfied with this manager`
  };
}

export function parseCompany(company, statistics) {
  const { id, name, avgSatisfaction, avatar, confirmed = true } = company;

  const { numberOpinions: count, ctruScore: score, topFiveScores } = statistics[id];

  return {
    id,
    name,
    avatar: avatar || '/assets/img/empty-avatar.jpg',
    count,
    score: Math.floor(score * 10) / 10,
    confirmed,
    grades: parseScores(topFiveScores),
    type: COMPANY,
    description: `${avgSatisfaction}% clients satisfied with the company`
  };
}

export default function parseData(companies, staffStatistics, companiesStatistics) {
  const newData = [];

  companies.forEach((company) => {
    const { manager } = company;

    newData.unshift(parseCompany(company, companiesStatistics));
    manager && newData.unshift(parseManager(manager, staffStatistics));
  });

  return newData;
}
