/* eslint-disable */

export default function normalizeCriteria(data) {
  const t0 = window.performance.now();
  const criteriaObj = {};

  const criteriaMerge = data.reduce((acc, { criteria }) => {
    const idList = acc.map((item) => item.criteriaId);
    const cloned = [...acc];

    criteria.forEach((item) => {
      if (idList.indexOf(item.criteriaId) === -1) {
        cloned.push(item);
      }
    });

    return cloned;
  }, []);

  criteriaMerge.forEach((criteria) => {
    const { subjects, ...criteriaProps } = criteria;
    const { criteriaId } = criteriaProps;

    criteriaObj[criteriaId] = criteriaProps;
    criteriaObj[criteriaId].subjects = {};

    subjects.forEach((subject) => {
      const { topics, ...subjectProps } = subject;
      const { subjectId } = subjectProps;

      criteriaObj[criteriaId].subjects[subjectId] = subjectProps;
      criteriaObj[criteriaId].subjects[subjectId].topics = {};

      topics.forEach((topic) => {
        const { topicId } = topic;
        criteriaObj[criteriaId].subjects[subjectId].topics[topicId] = topic;
      });
    });
  });

  console.log(criteriaObj);

  console.log('time', window.performance.now() - t0);
  return criteriaObj;
}

// export default function normalizeCriteria(data) {
//   const criteriaArr = [];
//   const subjectObj = {}; // keys is criteriaId
//   const topicObj = {}; // keys is subjectId
//
//   const criteriaMerge = data.reduce((acc, { criteria }) => {
//     const idList = acc.map((item) => item.criteriaId);
//     const cloned = [...acc];
//
//     criteria.forEach((item) => {
//       if (idList.indexOf(item.criteriaId) === -1) {
//         cloned.push(item);
//       }
//     });
//
//     return cloned;
//   }, []);
//
//   criteriaMerge.forEach((criteria) => {
//     const { subjects, ...criteriaProps } = criteria;
//     const { criteriaId } = criteriaProps;
//
//     criteriaArr.push(criteriaProps);
//
//     subjects.forEach((subject) => {
//       const { topics, ...subjectProps } = subject;
//       const { subjectId } = subjectProps;
//
//       if (subjectObj[criteriaId]) {
//         subjectObj[criteriaId].push(subjectProps);
//       } else {
//         subjectObj[criteriaId] = [subjectProps];
//       }
//
//       topics.forEach((topic) => {
//         if (topicObj[subjectId]) {
//           topicObj[subjectId].push(topic);
//         } else {
//           topicObj[subjectId] = [topic];
//         }
//       });
//     });
//   });
//
//   console.log({
//     criteriaArr,
//     subjectObj,
//     topicObj
//   });
//
//   return {
//     criteriaArr,
//     subjectObj,
//     topicObj
//   };
// }
