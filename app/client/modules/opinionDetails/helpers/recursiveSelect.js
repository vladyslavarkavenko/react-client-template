export default function recursiveSelect(obj, { criteriaId, subjectId, topicId }) {
  const criteria = obj[criteriaId] || Object.values(obj)[0];
  const subject = criteria[subjectId] || Object.values(criteria.subjects)[0];
  const topic = subject[topicId] || Object.values(subject.topics)[0];

  return {
    criteria: criteria.criteriaId,
    subject: subject.subjectId,
    topic
  };
}
