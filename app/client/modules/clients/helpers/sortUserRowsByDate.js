export default function sortUserRowsByDate(a, b) {
  return new Date(a.expiredIn) - new Date(b.expiredIn) > 0 ? -1 : 1;
}
