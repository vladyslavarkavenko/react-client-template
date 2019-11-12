import { startOfWeek, endOfWeek } from 'date-fns';
import trimDate from './trimDate';

export default function calcWeekOffset(date = new Date()) {
  return {
    minDate: trimDate(startOfWeek(date)),
    maxDate: trimDate(endOfWeek(date))
  };
}
