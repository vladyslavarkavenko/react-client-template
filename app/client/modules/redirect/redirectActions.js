import { takeLatest, take } from 'redux-saga/effects';

import createInitRoutine from '../helpers/createInitRoutine';
import createRequestRoutine from '../helpers/createRequestRoutine';

export const prefix = 'routing';

export const historyWatcherInit = createInitRoutine(prefix, 'WATCHER');
export const historyPush = createRequestRoutine(prefix, 'PUSH');

function* redirectWorker({ payload: { history } }) {
  try {
    while (true) {
      const action = yield take(historyPush.TRIGGER);

      // if we want use replace
      if (typeof action.payload === 'object') {
        history[action.payload.method](action.payload.to);
      } else {
        history.push(action.payload);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export function* redirectWatcher() {
  yield takeLatest(historyWatcherInit, redirectWorker);
}
