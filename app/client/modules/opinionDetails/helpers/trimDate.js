import { format } from 'date-fns';

export default function trimDate(date) {
  return format(date, 'yyyy-MM-dd');
}
