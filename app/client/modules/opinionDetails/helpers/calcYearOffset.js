import { endOfYear, startOfYear } from 'date-fns';
import trimDate from './trimDate';

export default function calcYearOffset(date = new Date()) {
  return {
    minDate: trimDate(startOfYear(date)),
    maxDate: trimDate(endOfYear(date))
  };
}
