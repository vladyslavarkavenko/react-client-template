import { put, takeLatest, all, call, select } from 'redux-saga/effects';

import { ROUTING_PARAMS } from '../../utils/constants';
import Notification from '../../utils/notifications';
import ManagerService from '../../services/manager';
import createRequestRoutine from '../helpers/createRequestRoutine';
import createOnlyTriggerRoutine from '../helpers/createOnlyTriggerRoutine';
import CompaniesService from '../../services/companies';
import normalizeCriteria from './helpers/normalizeCriteria';
import recursiveSelect from './helpers/recursiveSelect';
import opinionDetailsSelectors from './opinionDetailsSelectors';

export const prefix = 'opinionDetails';

const createRequestBound = createRequestRoutine.bind(null, prefix);
const createOnlyTriggerBound = createOnlyTriggerRoutine.bind(null, prefix);

export const fetchOpinionDetails = createRequestBound('OPINION_DETAILS_FETCH');
export const setProfile = createRequestBound('PROFILE_SET');

export const selectOption = createRequestBound('OPTION_SELECT');

export const clearAll = createOnlyTriggerBound('CLEAR_ALL');

function* getDetailsWorker({ payload }) {
  yield put(fetchOpinionDetails.request());
  try {
    const { id, type, criteriaId, subjectId, topicId } = payload;

    const data =
      type === ROUTING_PARAMS.MANAGER
        ? yield call(ManagerService.getRadarScores, id)
        : yield call(CompaniesService.getRadarScores, id);

    const normalize = normalizeCriteria(data);

    const selected = recursiveSelect(normalize, { criteriaId, subjectId, topicId });

    yield put(setProfile.success(selected));
    yield put(fetchOpinionDetails.success(normalize));
  } catch (err) {
    console.error(err);
    Notification.error(err);
    yield put(fetchOpinionDetails.failure());
  }
}

function* selectOptionWorker({ payload }) {
  const criteria = yield select(opinionDetailsSelectors.getCriteriaData);

  const oldCriteria = yield select(opinionDetailsSelectors.selectedCriteria);
  const oldSubject = yield select(opinionDetailsSelectors.selectedSubject);
  const oldTopic = yield select(opinionDetailsSelectors.selectedTopic);

  const { criteriaId, subjectId, topicId } = payload;

  const selected = recursiveSelect(criteria, {
    criteriaId: criteriaId || oldCriteria,
    subjectId: subjectId || oldSubject,
    topicId: topicId || oldTopic.topicId
  });

  yield put(setProfile.success(selected));
}

export function* opinionDetailsWatcher() {
  yield all([
    takeLatest(setProfile.TRIGGER, getDetailsWorker),
    takeLatest(selectOption.TRIGGER, selectOptionWorker)
  ]);
}
