import { addMonths } from 'date-fns';

export default function generateDomain(minDate) {
  const start = new Date(minDate);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const months = Array(12).fill(null);
  const domain = months.map((_, index) => addMonths(start, index).getTime());

  return domain;
}
