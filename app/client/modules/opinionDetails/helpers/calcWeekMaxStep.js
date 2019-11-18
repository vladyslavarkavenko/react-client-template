import { differenceInWeeks } from 'date-fns';

export default function calcMonthMaxStep(date = new Date(), minYearDate) {
  const maxStep = differenceInWeeks(date, new Date(minYearDate));

  console.info(`Weeks -> MinYearDate: ${minYearDate}, MaxStep: ${maxStep}`);

  return maxStep;
}
