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

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(applyMiddleware(thunk, sagaMiddleware));

const store = createStore(rootReducer, undefined, enhancer);

store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);

addResponseIntercept(store);

store.dispatch(pushLoginByToken.trigger());

export default store;
