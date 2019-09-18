import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
// import reducerRegistry from '../../utils/reducerRegistry';

import * as actions from './authActions';
import { formatRolesPayload } from '../helpers/helpers';
import { makeStatusReducer } from '../../utils/reduxHelpers';
import { pushLoginByToken } from './authActions';
import { pushLogin } from './authActions';

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
    }
  },
  userInitial
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
      return null;
    },
    [actions.pushLoginByToken.FAILURE]() {
      return null;
    },
    [actions.pushLogout.TRIGGER]() {
      return null;
    }
  },
  null
);

const roleInitial = null;

const roleReducer = handleActions(
  {
    [actions.setActiveRole.TRIGGER](state, { payload }) {
      // TODO: Move to saga
      localStorage.setItem('role', payload);
      return payload;
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
      const { rolesPermissions } = formatRolesPayload(payload.roles);
      return rolesPermissions;
    },
    [actions.pushLoginByToken.SUCCESS](state, { payload }) {
      const { rolesPermissions } = formatRolesPayload(payload.roles);
      return rolesPermissions;
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
  rolePermissions: permissionsReducer
});

// TODO: Add different statuses for token and simple login
const status = makeStatusReducer([pushLoginByToken, pushLogin]);

const authReducer = combineReducers({
  status,
  data
});

// reducerRegistry.register(actions.prefix, authReducer);

export default authReducer;
// const oldAuthInital = {
//   user: null,
//   isAuthorized: null,
//   activeRole: null, // CUSTOMER/ MANAGER/ ANALYST/ ADMIN
//   rolesPermissions: null // { CUSTOMER: [id], MANAGER: id, ANALYST: id, ADMIN: id }
// };
