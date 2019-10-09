export default function normalizeTopics(subjects) {
  let allTopics = [];

  subjects.forEach((subject) => {
    const partial = subject.topics.map((topic) => ({
      label: topic.name,
      value: topic.id,
      group: subject.name
    }));

    allTopics = [...allTopics, ...partial];
  });

  return allTopics;
}
