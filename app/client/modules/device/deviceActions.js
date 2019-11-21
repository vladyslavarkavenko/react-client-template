import { createRoutine } from 'redux-saga-routines';
import { all, put, takeLatest, delay } from 'redux-saga/effects';

export const deviceChange = createRoutine('DEVICE_CHANGE');

function* deviceChangeWatcher({ payload }) {
  yield delay(250);
  yield put(deviceChange.success(payload));
}

export function* deviceWatcher() {
  yield all([takeLatest(deviceChange.TRIGGER, deviceChangeWatcher)]);
}
