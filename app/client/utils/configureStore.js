import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../rootReducer';

// import reducerRegistry from './reducerRegistry';
import { addResponseIntercept } from './api';
// import CONFIG from './config';
import rootSaga from '../rootSaga';
import { pushLoginByToken } from '../modules/auth/authActions';

// const preloadedState = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();

// const combine = (reducers) => {
//   // const reducerNames = Object.keys(reducers);
//   // Object.keys(preloadedState).forEach((item) => {
//   //   if (reducerNames.indexOf(item) === -1) {
//   //     reducers[item] = (state = null) => state;
//   //   }
//   // });
//   // console.log(reducers);
//   return combineReducers(reducers);
// };

const enhancer = composeWithDevTools(applyMiddleware(thunk, sagaMiddleware));
// const enhancer =
//   ENV === 'development'
//     ? composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
//     : composeWithDevTools(applyMiddleware(thunk, sagaMiddleware));

// console.log(reducerRegistry);
// const rootReducer = combine(reducerRegistry.getReducers());

const store = createStore(rootReducer, undefined, enhancer);
sagaMiddleware.run(rootSaga);

store.dispatch(pushLoginByToken.trigger());
// sagaMiddleware.run(rootSaga)
// To replace the store's reducer whenever a new reducer is registered.
// reducerRegistry.setChangeListener((reducers) => {
//   store.replaceReducer(combine(reducers));
// });

addResponseIntercept(store);

export default store;
