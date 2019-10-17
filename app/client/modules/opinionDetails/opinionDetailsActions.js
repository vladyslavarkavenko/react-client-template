import { put, takeLatest, all, call } from 'redux-saga/effects';

import { ROUTING_PARAMS } from '../../utils/constants';
import ManagerService from '../../services/manager';
import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import CompaniesService from '../../services/companies';
import normalizeCriteria from './helpers/normalizeCriteria';
import recursiveSelect from './helpers/recursiveSelect';

export const prefix = 'opinionDetails';

const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

/* eslint-disable */
export const fetchOpinionDetails = createRequestBound('OPINION_DETAILS_FETCH');
export const setProfile = createRequestBound('PROFILE_SET');

export const selectCriteria = createOnlyTriggerBound('CRITERIA_SELECT');
export const selectSubject = createOnlyTriggerBound('SUBJECT_SELECT');
export const selectTopic = createOnlyTriggerBound('TOPIC_SELECT');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getDetailsWorker({ payload }) {
  yield put(fetchOpinionDetails.request());
  try {
    const { id, type, criteriaId, subjectId, topicId } = payload;

    const data =
      type === ROUTING_PARAMS.MANAGER
        ? yield call(ManagerService.getRadarScores, id)
        : yield call(CompaniesService.getRadarScores, id);

    console.log(data);

    const normalize = normalizeCriteria(data);

    const selected = recursiveSelect(normalize, { criteriaId, subjectId, topicId });

    yield put(setProfile.success(selected));
    yield put(fetchOpinionDetails.success(normalize));
  } catch (err) {
    console.error(err);
    // Notification.error(err);
    yield put(fetchOpinionDetails.failure());
  }
}

export function* opinionDetailsWatcher() {
  yield all([takeLatest(setProfile.TRIGGER, getDetailsWorker)]);
}
