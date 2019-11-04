export default function recursiveSelect(obj, { criteriaId, subjectId, topicId }) {
  const criteria = obj[criteriaId] || Object.values(obj)[0];
  const subject = criteria.subjects[subjectId] || Object.values(criteria.subjects)[0];
  const topic = subject.topics[topicId] || Object.values(subject.topics)[0];

  return {
    criteria: criteria.id,
    subject: subject.id,
    topic
  };
}
