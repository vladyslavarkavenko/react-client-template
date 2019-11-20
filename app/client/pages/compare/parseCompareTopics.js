const parseCompareTopics = (data) => {
  const { main, compare } = data;

  let type;
  const compareTopics = [];
  const usedTopicsIds = {};

  const cb = ({ ctruScore, topic: { id, name: title } }) => {
    const index = usedTopicsIds[id];

    if (index === undefined) {
      compareTopics.push({
        type,
        title,
        domain: 10,
        single: true,
        value: ctruScore
      });
      usedTopicsIds[id] = compareTopics.length - 1;
    } else {
      const item = compareTopics[index];
      const values = item.type === 'main' ? [item.value, ctruScore] : [ctruScore, item.value];

      compareTopics[index] = {
        title,
        values,
        domain: 10
      };
    }
  };

  type = 'main';
  main.forEach(cb);
  type = 'compare';
  compare.forEach(cb);

  return compareTopics;
};

export default parseCompareTopics;
