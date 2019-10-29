const isFilterOpen = (state) => state.benchmarks.filters.isOpen;
const getFilterStatus = (state) => state.benchmarks.filters.status;
const getFilterData = (state) => state.benchmarks.filters.data;
const getSelectedFilters = (state) => state.benchmarks.filters.selected;

const isFilterChecked = (state, id) => {
  const selected = getSelectedFilters(state).map((item) => item.id);

  return selected.indexOf(id) !== -1;
};

const getCheckedBySubject = (state, subjectId) => {
  const selected = getSelectedFilters(state).filter((item) => item.subjectId === subjectId);

  return selected;
};

// const getCheckedCountBySubject = (state, subjectId) => {
//   const selected = getSelectedFilters(state);
//
//   const count = selected.reduce((item, acc) => {
//     if (item.subjectId === subjectId) {
//       return acc + 1
//     }
//     return acc
//   }, 0);
//
//   return count
// }

export default {
  isFilterOpen,
  getFilterStatus,
  getFilterData,
  getSelectedFilters,
  isFilterChecked,

  // getCheckedCountBySubject,
  getCheckedBySubject
};
