import { startOfMonth, endOfMonth } from 'date-fns';
import trimDate from './trimDate';

export default function calcMonthOffset(date = new Date()) {
  return {
    minDate: trimDate(startOfMonth(date)),
    maxDate: trimDate(endOfMonth(date))
  };
}
