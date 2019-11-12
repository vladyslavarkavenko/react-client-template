import { addMonths, eachDayOfInterval } from 'date-fns';

import { DATE_OFFSET } from './constants';

export default function generateDomain(dateOffset, minDate, maxDate) {
  const start = new Date(minDate);
  const end = new Date(maxDate);
  let domain = [];

  /* eslint-disable */
  switch (dateOffset) {
    case DATE_OFFSET.MONTH:
    case DATE_OFFSET.WEEK:
      domain = eachDayOfInterval({ start, end }).map((date) => date.getTime());
      break;
    case DATE_OFFSET.YEAR:
      start.setDate(1);
      const months = Array(12).fill(null);
      domain = months.map((_, index) => addMonths(start, index).getTime());
      break;
  }

  return domain;
}
