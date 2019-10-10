import { differenceInMonths } from 'date-fns';
import { ROLES, STAFF_TABLE_STATUS } from '../../../utils/constants';

function findTopics(topicListId, subjectList) {
  const topics = [];

  topicListId.forEach((topicId) => {
    const value = subjectList.find((item) => item.value === topicId);
    if (value) {
      topics.push(value);
    }
  });

  return topics;
}

export default function normalizeUserData(user, subjectList, forceStatus) {
  const roles = user.roles || [];
  const topics = findTopics(user.topics, subjectList);
  let status = STAFF_TABLE_STATUS.ACTIVE;

  if (user.isAdmin) {
    roles.push(ROLES.ADMIN);
  }

  if (user.isManager) {
    roles.push(ROLES.MANAGER);
  }

  if (user.isAnalyst) {
    roles.push(ROLES.ANALYST);
  }

  if (user.expiredIn) {
    differenceInMonths(new Date(), new Date(user.expiredIn)) > 6
      ? (status = STAFF_TABLE_STATUS.EXPIRED)
      : (status = STAFF_TABLE_STATUS.PENDING);
  }

  if (forceStatus) {
    status = forceStatus;
  }

  if (!roles.length) {
    status = STAFF_TABLE_STATUS.BLOCKED;
  }

  return {
    id: Number(user.id),
    firstName: user.userData ? user.userData.firstName : user.firstName,
    lastName: user.userData ? user.userData.lastName : user.lastName,
    email: user.userData ? user.userData.email : user.email,
    expiredIn: user.expiredIn,

    topics,
    status,
    roles,
    isChecked: false,
    isChanged: false
  };
}
