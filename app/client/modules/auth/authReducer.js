import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
// import reducerRegistry from '../../utils/reducerRegistry';

import * as actions from './authActions';
import { makeStatusReducer } from '../../utils/reduxHelpers';

const userInitial = null;

const userReducer = handleActions(
  {
    [actions.pushLogin.SUCCESS](state, { payload }) {
      return payload.user;
    },
    [actions.pushLoginByToken.SUCCESS](state, { payload }) {
      return payload.user;
    },
    [actions.pushLogin.FAILURE]() {
      return userInitial;
    },
    [actions.pushLoginByToken.FAILURE]() {
      return userInitial;
    },
    [actions.pushLogout.TRIGGER]() {
      return userInitial;
    },
    [actions.pushUpdateUser.SUCCESS](state, { payload }) {
      return payload;
    }
  },
  userInitial
);

const isEdit = handleActions(
  {
    [actions.editModeUser](state) {
      return !state;
    }
  },
  false
);

const initErrors = {};
const errors = handleActions(
  {
    [actions.setUserErrors](state, { payload }) {
      return payload;
    },
    [actions.editModeUser]() {
      return initErrors;
    }
  },
  initErrors
);

const activeEditUser = handleActions(
  {
    [actions.pushLoginByToken.SUCCESS](state, { payload }) {
      return payload.user;
    },
    [actions.pushLogin.SUCCESS](state, { payload }) {
      return payload.user;
    },
    [actions.updateUser](state, { payload }) {
      return { ...state, ...payload };
    }
  },
  null
);

const isAuthReducer = handleActions(
  {
    [actions.pushLogin.SUCCESS]() {
      return true;
    },
    [actions.pushLoginByToken.SUCCESS]() {
      return true;
    },
    [actions.pushLogin.FAILURE]() {
      return false;
    },
    [actions.pushLoginByToken.FAILURE]() {
      return false;
    },
    [actions.pushLogout.TRIGGER]() {
      return false;
    }
  },
  false
);

const roleInitial = null;

const roleReducer = handleActions(
  {
    [actions.pushLoginByToken.SUCCESS](state, { payload }) {
      return payload.activeRole || state;
    },
    [actions.pushLogin.SUCCESS](state, { payload }) {
      return payload.activeRole || state;
    },
    [actions.setActiveRole.SUCCESS](state, { payload }) {
      return payload.role;
    },
    [actions.pushLogout.TRIGGER]() {
      return roleInitial;
    }
  },
  roleInitial
);

const permissionsInitial = null;

const permissionsReducer = handleActions(
  {
    [actions.pushLogin.SUCCESS](state, { payload }) {
      return payload.rolesPermissions;
    },
    [actions.pushLoginByToken.SUCCESS](state, { payload }) {
      return payload.rolesPermissions;
    },
    [actions.pushLogin.FAILURE]() {
      return permissionsInitial;
    },
    [actions.pushLoginByToken.FAILURE]() {
      return permissionsInitial;
    },
    [actions.pushLogout.TRIGGER]() {
      return permissionsInitial;
    }
  },
  permissionsInitial
);

const data = combineReducers({
  user: userReducer,
  isAuthorized: isAuthReducer,
  activeRole: roleReducer,
  rolesPermissions: permissionsReducer
});

// TODO: Add different statuses for token and simple login
const status = makeStatusReducer([actions.pushLoginByToken, actions.pushLogin]);

const authReducer = combineReducers({
  status,
  data,
  isEdit,
  errors,
  activeEditUser
});

// reducerRegistry.register(actions.prefix, authReducer);

export default authReducer;
