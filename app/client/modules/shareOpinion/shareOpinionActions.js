import { call, put, takeLatest, all, select } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import ShareOpinionService from '../../services/shareOpinion';
import Notification from '../../utils/notifications';
import shareOpinionSelectors from './shareOpinionSelectors';

import { RATE_PROFILE_TYPE } from '../../utils/constants';
import { validateCreateNewTopic } from '../../utils/validator';

export const prefix = 'shareOpinion';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const selectOpinionProfile = createRequestBound('PROFILE_SELECT');
export const selectOpinionTopic = createRequestBound('TOPIC_SELECT');
export const selectOpinionExpired = createRequestBound('TOPIC_EXPIRED_SELECT');
export const fetchOpinionSubjects = createRequestBound('SUBJECTS_FETCH');

export const pushNewTopic = createRequestBound('TOPIC_CREATE');
export const selectSubjectForNewTopic = createRequestBound('TOPIC_WITH_SUBJECT_SELECT');
export const saveNewTopicField = createRequestBound('TOPIC_FIELD_SAVE');

function* fetchOpinionSubjectsWorker({ payload: { data } }) {
  yield put(fetchOpinionSubjects.request());
  try {
    const subjects = yield call(() => ShareOpinionService.getSubjectsByManager(data.id));

    yield put(fetchOpinionSubjects.success(subjects));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchOpinionSubjects.failure());
  }
}

function* selectExpiredOpinionsWorker() {
  const subjects = yield select(shareOpinionSelectors.subjectsData);
  const expiredList = yield select(shareOpinionSelectors.expiredOpinions);

  let selectedTopics = [];

  Object.keys(expiredList).forEach((subjectId) => {
    const currentSubject = subjects.find((subject) => subject.id === Number(subjectId));

    if (!currentSubject) {
      return;
    }

    const partialSelection = currentSubject.topics.filter((topic) =>
      expiredList[subjectId].includes(topic.id)
    );

    selectedTopics = [...selectedTopics, ...partialSelection];
  });

  yield put(selectOpinionExpired.success(selectedTopics));
}

function* newTopicModalWorker({ payload }) {
  if (payload) {
    yield put(selectSubjectForNewTopic(payload));
  }
}

function* subjectHintsWorker({ payload }) {
  if (payload.type === 'subject' && payload.value.length >= 3) {
    const subjectList = yield select(shareOpinionSelectors.subjectsData);
    const hints = [];

    subjectList.forEach((subject) => {
      if (subject.name.toLowerCase().indexOf(payload.value.toLowerCase()) !== -1) {
        hints.push(subject);
      }
    });

    console.log(hints);
    yield put(saveNewTopicField.success(hints));
  } else {
    yield put(saveNewTopicField.fulfill());
  }
}

function* newTopicWorker() {
  const subjectList = yield select(shareOpinionSelectors.subjectsData);
  const input = yield select(shareOpinionSelectors.newTopicInput);
  const selectedProfile = yield select(shareOpinionSelectors.selectedProfile);

  let selectedSubject = yield select(shareOpinionSelectors.newTopicSelected);

  if (!selectedSubject) {
    // find subject in full list by input
    const matchedSubject = subjectList.find(
      (subject) => subject.name.toLowerCase() === input.subject.toLowerCase()
    );

    //assign founded value
    if (matchedSubject) {
      selectedSubject = matchedSubject;
    }
  }

  // if subject exist, validate topic list
  const topicList = selectedSubject
    ? selectedSubject.topics.map((topic) => topic.name.toLowerCase())
    : [];

  const { isValid, errors } = validateCreateNewTopic({
    subject: input.subject.toLowerCase(),
    subjectList: [], // already validated
    topic: input.topic.toLowerCase(),
    topicList
  });

  if (!isValid) {
    yield put(pushNewTopic.failure(errors));
    return;
  }

  try {
    // if it's unique subject then create this subject
    if (!selectedSubject) {
      const newSubject = yield call(() =>
        ShareOpinionService.pushCreateSubject({
          name: input.subject,
          author: selectedProfile.customerId,
          //TODO: Remove criteria field after backend fix
          criteria: [1]
        })
      );

      // then create topic for this subject
      const newTopic = yield call(() =>
        ShareOpinionService.pushCreateTopic({
          name: input.topic,
          subject: newSubject.id,
          author: selectedProfile.customerId,

          manager:
            selectedProfile.type === RATE_PROFILE_TYPE.MANAGER ? selectedProfile.id : undefined
        })
      );

      //send new topic id and title
      yield put(pushNewTopic.success(newTopic));
    } else {
      // create topic and attach it to existed subject
      const newTopic = yield call(() =>
        ShareOpinionService.pushCreateTopic({
          name: input.topic,
          subject: selectedSubject.id,
          author: selectedProfile.customerId,

          manager:
            selectedProfile.type === RATE_PROFILE_TYPE.MANAGER ? selectedProfile.id : undefined
        })
      );

      //send new topic id and title
      yield put(pushNewTopic.success(newTopic));
    }
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushNewTopic.failure());
  }
}
//
export function* shareOpinionWatcher() {
  yield all([
    takeLatest(selectOpinionProfile.TRIGGER, fetchOpinionSubjectsWorker),
    takeLatest(selectOpinionExpired.TRIGGER, selectExpiredOpinionsWorker),
    takeLatest(pushNewTopic.TRIGGER, newTopicModalWorker),
    takeLatest(pushNewTopic.REQUEST, newTopicWorker),
    takeLatest(saveNewTopicField.TRIGGER, subjectHintsWorker)
  ]);
}
