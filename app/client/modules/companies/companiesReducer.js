import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
// import reducerRegistry from '../../utils/reducerRegistry';

import * as actions from './companiesActions';
import * as auth from '../auth/authActions';

const companiesInitial = null; // { id1: {}, id2: {}, ... }

// TODO: Need refactoring
const companiesReducer = handleActions(
  {
    [auth.pushLogin.SUCCESS](state, { payload }) {
      return payload.companies;
    },
    [auth.pushLoginByToken.SUCCESS](state, { payload }) {
      return payload.companies;
    },
    [actions.setCompanies.SUCCESS](state, { payload }) {
      return payload;
    },
    [actions.pushUpdateCompany.SUCCESS](state, { payload }) {
      const newCompanies = { ...state.companies };
      newCompanies[payload.id] = payload;

      return newCompanies;
    }
  },
  companiesInitial
);

const isEdit = handleActions(
  {
    [actions.editModeCompanies](state) {
      return !state;
    }
  },
  false
);

const initErrors = {};
const errors = handleActions(
  {
    [actions.setCompanyErrors](state, { payload }) {
      return payload;
    },
    [actions.updateCompany](state, { payload }) {
      const resetErrors = {};
      Object.keys(payload).forEach((key) => {
        resetErrors[key] = undefined;
      });

      return { ...state, ...resetErrors };
    },
    [actions.editModeCompanies]() {
      return initErrors;
    }
  },
  initErrors
);

const activeEditCompany = handleActions(
  {
    [auth.pushLoginByToken.SUCCESS](state, { payload }) {
      const { companies, rolesPermissions, activeRole } = payload;

      return companies[rolesPermissions[activeRole]];
    },
    [auth.pushLogin.SUCCESS](state, { payload }) {
      const { companies, rolesPermissions, activeRole } = payload;

      return companies[rolesPermissions[activeRole]];
    },
    [auth.setActiveRole.SUCCESS](state, { payload }) {
      return payload.company;
    },
    [actions.updateCompany](state, { payload }) {
      return { ...state, ...payload };
    }
  },
  null
);

const companies = combineReducers({
  isEdit,
  errors,
  activeEditCompany,
  data: companiesReducer
});

// reducerRegistry.register(actions.prefix, companiesReducer);
export default companies;
