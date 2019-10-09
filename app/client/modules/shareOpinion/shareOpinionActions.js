import { call, put, takeLatest, all, fork, select } from 'redux-saga/effects';
import i18next from 'i18next';

import createRequestRoutine from '../helpers/createRequestRoutine';
import ShareOpinionService from '../../services/shareOpinion';
import Notification from '../../utils/notifications';
import shareOpinionSelectors from './shareOpinionSelectors';

import { RATE_PROFILE_TYPE } from '../../utils/constants';
import { validateCreateNewTopic } from '../../utils/validator';
import { historyPush } from '../redirect/redirectActions';
import routing from '../../utils/routing';

export const prefix = 'shareOpinion';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const selectOpinionProfile = createRequestBound('PROFILE_SELECT');
export const selectOpinionTopic = createRequestBound('TOPIC_SELECT');
export const selectOpinionExpired = createRequestBound('TOPIC_EXPIRED_SELECT');
export const fetchOpinionSubjects = createRequestBound('SUBJECTS_FETCH');
export const fetchTopicOpinions = createRequestBound('TOPIC_OPINIONS_FETCH');

export const pushNewTopic = createRequestBound('TOPIC_NEW_CREATE');
export const selectSubjectForNewTopic = createRequestBound('TOPIC_NEW_WITH_SUBJECT_SELECT');
export const saveNewTopicField = createRequestBound('TOPIC_NEW_FIELD_SAVE');

export const pushRateTopic = createRequestBound('TOPIC_CURRENT_RATE');

export const selectTopicReview = createRequestBound('REVIEW_SELECT');
export const selectReviewRecommend = createRequestBound('REVIEW_RECOMMEND_SELECT');
export const selectWhoCanSee = createRequestBound('REVIEW_CAN_SEE_SELECT');
export const selectExpectAction = createRequestBound('REVIEW_EXPECT_ACTION_SELECT');

export const saveTopicField = createRequestBound('TOPIC_FIELD_SAVE');
export const pushUpdateTopics = createRequestBound('TOPIC_UPDATE_SEND');

export const calcAverageRate = createRequestBound('AVERAGE_RATE_CALC');

function* fetchOpinionSubjectsWorker() {
  yield put(fetchOpinionSubjects.request());
  try {
    const { id, type } = yield select(shareOpinionSelectors.selectedProfile);

    let subjects;

    if (type === RATE_PROFILE_TYPE.MANAGER) {
      subjects = yield call(() => ShareOpinionService.getSubjectsByManager(id));
    } else {
      subjects = yield call(() => ShareOpinionService.getSubjectsByCompany(id));
    }

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
          author: selectedProfile.customerId
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

    yield put(historyPush(routing().shareOpinionChart));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushNewTopic.failure());
  }
}

function* pushRateTopicWorker({ payload: { satisfaction, importance } }) {
  yield put(pushRateTopic.request());
  try {
    const currentTopic = yield select(shareOpinionSelectors.nextUnratedTopic);
    const { type, id, customerId } = yield select(shareOpinionSelectors.selectedProfile);
    let ratedTopic;

    if (type === RATE_PROFILE_TYPE.MANAGER) {
      ratedTopic = yield call(() =>
        ShareOpinionService.pushRateTopicByManager({
          manager: id,
          topic: currentTopic.id, //topic_id,
          customer: customerId, //customer id
          satisfaction,
          importance
        })
      );
    } else {
      ratedTopic = yield call(() =>
        ShareOpinionService.pushRateTopicByCompany({
          company: id,
          topic: currentTopic.id,
          customer: customerId,
          satisfaction,
          importance
        })
      );
    }

    const { result } = yield ShareOpinionService.getOpinionScore({
      satisfaction,
      importance
    });

    yield put(pushRateTopic.success({ ...ratedTopic, score: result }));

    const nextTopic = yield select(shareOpinionSelectors.nextUnratedTopic);

    if (!nextTopic) {
      const topics = yield select(shareOpinionSelectors.selectedTopics);
      const rate =
        Math.round(10 * (topics.reduce((acc, topic) => acc + topic.score, 0) / topics.length)) / 10;

      yield put(calcAverageRate.trigger(rate));
      yield put(historyPush({ to: routing().shareOpinionMessage, method: 'replace' }));
    }
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushRateTopic.failure());
  }
}

function* fetchTopicOpinionsWorker() {
  yield put(fetchTopicOpinions.request());
  try {
    const { id, type } = yield select(shareOpinionSelectors.selectedProfile);
    const topic = yield select(shareOpinionSelectors.nextUnratedTopic);
    let opinions;

    if (topic._isCreated) {
      yield put(fetchTopicOpinions.success());
      return;
    }

    if (type === RATE_PROFILE_TYPE.MANAGER) {
      opinions = yield call(() =>
        ShareOpinionService.getTopicOpinionsByManager({ id, topic: topic.id })
      );
    } else {
      opinions = yield call(() =>
        ShareOpinionService.getTopicOpinionsByCompany({ id, topic: topic.id })
      );
    }

    yield put(fetchTopicOpinions.success(opinions));
  } catch (err) {
    console.error(err);
    yield put(fetchTopicOpinions.failure());
  }
}

function* patchTopicFieldsWorker({ fields, file, isChecked }) {
  try {
    let opinion;

    if (fields.manager) {
      opinion = yield call(() => ShareOpinionService.pushRateTopicByManager(fields));
    } else {
      opinion = yield call(() => ShareOpinionService.pushRateTopicByCompany(fields));
    }

    const { id } = opinion;

    if (file && isChecked) {
      const data = new window.FormData();

      data.append('file', file.file, file.fileName);

      if (fields.manager) {
        yield call(() => ShareOpinionService.pushFileToTopicByManager({ id, data }));
      } else {
        yield call(() => ShareOpinionService.pushFileToTopicByCompany({ id, data }));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function* pushUpdateTopicsWorker({ payload }) {
  yield put(pushUpdateTopics.request());
  try {
    const { type, id, customerId } = yield select(shareOpinionSelectors.selectedProfile);
    const selectedTopics = yield select(shareOpinionSelectors.selectedTopics);
    const selectedOptions = yield select(shareOpinionSelectors.selectedOptions);

    const { withComments } = selectedOptions;

    const tasks = selectedTopics.map((topic) => {
      const { isChecked } = topic;

      const fields = {
        topic: topic.id,
        manager: type === RATE_PROFILE_TYPE.MANAGER ? id : undefined, // manager or company_id,
        company: type === RATE_PROFILE_TYPE.COMPANY ? id : undefined,
        customer: customerId, //customer id
        comment: withComments && isChecked ? topic.comment : undefined,
        expectActionProvider: selectedOptions.isExpectingAction,
        isRecommended: selectedOptions.isRecommended,
        statusSharedComment: selectedOptions.whoCanSee
      };

      const file = withComments ? payload[topic.id] : null;

      return fork(patchTopicFieldsWorker, { fields, file, isChecked });
    });

    yield all(tasks);

    yield put(pushUpdateTopics.success());
    yield put(historyPush({ method: 'replace', to: routing().shareOpinion }));
    Notification.success(i18next.t('shareOpinion.notification.thanksForFeedback'));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(pushUpdateTopics.failure());
  }
}

export function* shareOpinionWatcher() {
  yield all([
    takeLatest(selectOpinionProfile.TRIGGER, fetchOpinionSubjectsWorker),
    takeLatest(selectOpinionExpired.TRIGGER, selectExpiredOpinionsWorker),
    takeLatest(pushNewTopic.TRIGGER, newTopicModalWorker),
    takeLatest(pushNewTopic.REQUEST, newTopicWorker),
    takeLatest(saveNewTopicField.TRIGGER, subjectHintsWorker),
    takeLatest(fetchTopicOpinions.TRIGGER, fetchTopicOpinionsWorker),

    takeLatest(pushRateTopic.TRIGGER, pushRateTopicWorker),

    takeLatest(pushUpdateTopics.TRIGGER, pushUpdateTopicsWorker)
  ]);
}
