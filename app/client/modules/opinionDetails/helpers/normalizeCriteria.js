export default function normalizeCriteria(data) {
  const criteriaObj = {};

  data.forEach((criteria) => {
    const { subjects, ...criteriaProps } = criteria;
    const { id: criteriaId } = criteriaProps;

    criteriaObj[criteriaId] = criteriaProps;
    criteriaObj[criteriaId].subjects = {};

    subjects.forEach((subject) => {
      const { topics, ...subjectProps } = subject;
      const { id: subjectId } = subjectProps;

      criteriaObj[criteriaId].subjects[subjectId] = subjectProps;
      criteriaObj[criteriaId].subjects[subjectId].topics = {};

      topics.forEach((topic) => {
        const { id: topicId } = topic;
        criteriaObj[criteriaId].subjects[subjectId].topics[topicId] = topic;
      });
    });
  });

  return criteriaObj;
}
