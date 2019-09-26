import { takeLatest, take } from 'redux-saga/effects';

import createInitRoutine from '../helpers/createInitRoutine';
import createRequestRoutine from '../helpers/createRequestRoutine';

export const prefix = 'routing';

export const historyWatcherInit = createInitRoutine(prefix, 'WATCHER');
export const historyPush = createRequestRoutine(prefix, 'PUSH');

function* redirectWorker({ payload: { history } }) {
  while (true) {
    const action = yield take(historyPush.TRIGGER);

    // if we want use replace
    if (typeof action.payload === 'object') {
      history[action.payload.method](action.payload.to);
      return;
    }

    history.push(action.payload);
  }
}

export default function* redirectWatcher() {
  yield takeLatest(historyWatcherInit, redirectWorker);
}
