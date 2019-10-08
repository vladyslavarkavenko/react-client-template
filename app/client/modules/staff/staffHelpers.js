import { differenceInMonths } from 'date-fns';
import { ROLES, STAFF_TABLE_STATUS } from '../../utils/constants';

export const normalizeTopics = (subjects) => {
  let allTopics = [];

  subjects.forEach((subject) => {
    const partial = subject.topics.map((topic) => ({
      label: topic.name,
      value: topic.id,
      group: subject.name
    }));

    allTopics = [...allTopics, ...partial];
  });

  return allTopics;
};

export const findTopics = (topicListId, subjectList) => {
  const topics = [];

  topicListId.forEach((topicId) => {
    const value = subjectList.find((item) => item.value === topicId);
    if (value) {
      topics.push(value);
    }
  });

  return topics;
};

export const normalizeUserData = (user, subjectList, forceStatus) => {
  const roles = [];
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
    differenceInMonths(new Date(), user.expiredIn) > 6
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
    ...user.userData,
    id: Number(user.id),
    expiredIn: user.expiredIn,
    topics: findTopics(user.topics, subjectList),
    isChecked: false,
    isChanged: false,
    status,
    roles
  };
};
