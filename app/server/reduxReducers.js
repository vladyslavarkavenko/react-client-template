import { combineReducers } from 'redux';

import auth from '../client/modules/auth/authReducer';
// import language from '../client/modules/language';
// import companies from '../client/modules/_companies';

// TODO: Think how to import all reducers without hardcode.
export default combineReducers({
  auth
  // language,
  // companies
});