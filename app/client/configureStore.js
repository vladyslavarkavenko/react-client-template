import { applyMiddleware, combineReducers, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducerRegistry from './utils/reducerRegistry';
import { addResponseIntercept } from './utils/api';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const combine = (reducers) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(preloadedState).forEach((item) => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

// TODO: Disable for production!
const enhancer = composeWithDevTools(applyMiddleware(thunk, logger));
const reducer = combine(reducerRegistry.getReducers());

const store = createStore(
  reducer,
  preloadedState,
  enhancer,
);

// To replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener((reducers) => {
  store.replaceReducer(combine(reducers));
});

addResponseIntercept(store);

export default store;
