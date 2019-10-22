import { differenceInMonths } from 'date-fns';

export default function getOnlyActual(subjects, now = new Date()) {
  const actual = [];

  subjects.forEach((subject) => {
    // for every topic check if its expired
    const haveExpired = subject.topics.some((topic) => {
      if (!topic.dateLastOpinion) {
        return true;
      }

      return differenceInMonths(now, new Date(topic.dateLastOpinion.split('-'))) >= 6;
    });

    if (!haveExpired) {
      actual.push(subject.id);
    }
  });

  return actual;
}
