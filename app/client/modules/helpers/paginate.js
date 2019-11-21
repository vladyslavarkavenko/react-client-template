export default function paginate({ data, currentPage = 1, offset = 10 }) {
  const { count, results } = data;

  const lastPage = Math.ceil(count / offset) || 1;

  const pagination = {
    currentPage,
    lastPage,
    count
  };

  return {
    pagination,
    results
  };
}

export function paginationInitial() {
  return {
    currentPage: 1,
    lastPage: 1,
    count: 0
  };
}
