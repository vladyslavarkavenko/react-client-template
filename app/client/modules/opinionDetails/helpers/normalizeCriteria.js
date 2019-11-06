/* eslint-disable */

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
