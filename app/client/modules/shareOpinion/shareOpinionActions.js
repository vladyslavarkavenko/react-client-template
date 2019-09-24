import { call, put, takeLatest, all } from 'redux-saga/effects';

import createRequestRoutine from '../helpers/createRequestRoutine';
import ShareOpinionService from '../../services/shareOpinion';
import Notification from '../../utils/notifications';

export const prefix = 'shareOpinion';
const createRequestBound = createRequestRoutine.bind(null, prefix);

export const selectOpinionProfile = createRequestBound('PROFILE_SELECT');
export const selectOpinionTopic = createRequestBound('TOPIC_SELECT');
export const fetchOpinionSubjects = createRequestBound('SUBJECTS_FETCH');

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
//
export function* shareOpinionWatcher() {
  yield all([takeLatest(selectOpinionProfile.TRIGGER, fetchOpinionSubjectsWorker)]);
}
