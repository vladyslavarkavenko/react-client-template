import { differenceInMonths } from 'date-fns';

export default function calcMonthMaxStep(date = new Date(), minYearDate) {
  const maxStep = differenceInMonths(date, new Date(minYearDate));

  console.info(`Months -> MinYearDate: ${minYearDate}, MaxStep: ${maxStep}`);

  return maxStep;
}
