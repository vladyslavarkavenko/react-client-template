const parseCompareTopics = (data) => {
  const { main, compare } = data;

  let type;
  const compareTopics = [];
  const usedTopicsIds = {};

  const cb = ({ ctruScore, topic: { id, name: title } }) => {
    const index = usedTopicsIds[id];

    if (index === undefined) {
      const values = type === 'main' ? [ctruScore, 0] : [0, ctruScore];

      compareTopics.push({
        type,
        title,
        values,
        domain: 10
      });
      usedTopicsIds[id] = compareTopics.length - 1;
    } else {
      const { type, value } = compareTopics[index];
      const values = type === 'main' ? [value, ctruScore] : [ctruScore, value];

      compareTopics[index] = {
        type,
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
