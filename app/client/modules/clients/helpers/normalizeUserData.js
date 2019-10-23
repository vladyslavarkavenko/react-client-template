import { differenceInDays } from 'date-fns';
import { STAFF_TABLE_STATUS } from '../../../utils/constants';

export default function normalizeUserData(user, managerList, forceStatus) {
  let status = user.isActive ? STAFF_TABLE_STATUS.ACTIVE : STAFF_TABLE_STATUS.BLOCKED;
  const manager = managerList
    ? managerList.find((item) => user.manager === item.value)
    : user.manager;

  if (user.expiredIn) {
    differenceInDays(new Date(), new Date(user.expiredIn)) >= 7
      ? (status = STAFF_TABLE_STATUS.EXPIRED)
      : (status = STAFF_TABLE_STATUS.PENDING);
  }

  if (forceStatus) {
    status = forceStatus;
  }

  return {
    id: Number(user.id),
    firstName: user.userData ? user.userData.firstName : user.firstName,
    lastName: user.userData ? user.userData.lastName : user.lastName,
    email: user.userData ? user.userData.email : user.email,
    expiredIn: user.expiredIn,
    manager,
    status,
    isChecked: false,
    isChanged: false
  };
}
