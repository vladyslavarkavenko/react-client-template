import { differenceInMonths } from 'date-fns';

export default function getOnlyExpired(subjects, now = new Date()) {
  const expired = {};

  subjects.forEach((subject) => {
    // for every topic
    subject.topics.forEach((topic) => {
      // check time
      if (!topic.dateLastOpinion) {
        return;
      }

      const isExpired = differenceInMonths(now, new Date(topic.dateLastOpinion.split('-'))) >= 6;
      // push if expired
      if (isExpired) {
        expired[subject.id]
          ? expired[subject.id].push(topic.id)
          : (expired[subject.id] = [topic.id]);
      }
    });
  });

  return expired;
}