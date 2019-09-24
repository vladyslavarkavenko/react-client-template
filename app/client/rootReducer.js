import { combineReducers } from 'redux';
import auth from './modules/auth/authReducer';
import companies from './modules/companies/companiesReducer';
import shareOpinion from './modules/shareOpinion/shareOpinionReducer';
import { pushLogout } from './modules/auth/authActions';

const appReducer = combineReducers({
  auth,
  companies,
  shareOpinion
});

export default (state, action) => {
  if (action.type === pushLogout.TRIGGER) {
    state = undefined;
  }

  return appReducer(state, action);
};
