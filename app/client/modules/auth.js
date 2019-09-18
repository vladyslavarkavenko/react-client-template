import AuthService from '../services/auth';
import { setApiHeaders } from '../utils/api';
import reducerRegistry from '../utils/reducerRegistry';
import { setTokens, stateFromRes, removeTokens } from './auth/helpers';
import { setCompanies } from './companies';

const reducerName = 'auth';

const createActionName = (name) => `app/${reducerName}/${name}`;

const SET_USER = createActionName('SET_USER');
const SET_ACTIVE_ROLE = createActionName('SET_ACTIVE_ROLE');
const AUTHORIZE = createActionName('AUTHORIZE');
const SET_ROLES = createActionName('SET_ROLES');

const initialState = {
  user: null,
  isAuthorized: null,
  activeRole: null, // CUSTOMER/ MANAGER/ ANALYST/ ADMIN
  rolesPermissions: null // { CUSTOMER: [id], MANAGER: id, ANALYST: id, ADMIN: id }
};

// TODO: Check refresh token functionality.

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case AUTHORIZE:
      return {
        ...state,
        isAuthorized: action.isAuthorized
      };
    case SET_ROLES: {
      const { type, ...rest } = action;

      return { ...state, ...rest };
    }
    case SET_ACTIVE_ROLE:
      return {
        ...state,
        activeRole: action.role
      };
    default:
      return state;
  }
}

// Sync actions
const setUser = (user) => ({
  user,
  type: SET_USER
});

const toggleAuthorize = (isAuthorized = true) => ({
  isAuthorized,
  type: AUTHORIZE
});

const setRoles = (data) => ({
  ...data,
  type: SET_ROLES
});

export const setActiveRole = (role) => {
  localStorage.setItem('role', role);

  return {
    role,
    type: SET_ACTIVE_ROLE
  };
};

// Async actions
function obtainTokens(data, cb) {
  return (dispatch) =>
    AuthService.obtainTokens(data)
      .then((tokens) => {
        setTokens(tokens);
        dispatch(toggleAuthorize());
        cb();
      })
      .catch((err) => {
        dispatch(toggleAuthorize(false));
        cb(err);
      });
}

export function signout() {
  return (dispatch) => {
    removeTokens();
    dispatch(toggleAuthorize(false));
  };
}

function getRoles(cb) {
  return (dispatch) =>
    AuthService.getRoles()
      .then((res) => {
        const { companies, ...rest } = stateFromRes(res);
        dispatch(setRoles(rest));
        dispatch(setCompanies(companies));
        cb && cb();
      })
      .catch((err) => {
        cb && cb(err);
      });
}

function getUser(cb) {
  return (dispatch) =>
    AuthService.getUser()
      .then((user) => {
        dispatch(setUser(user));
        dispatch(getRoles(cb));
        dispatch(toggleAuthorize());
        cb && cb();
      })
      .catch((err) => {
        // If 401 we try to use refresh token (In axios interceptor).
        if (err.status !== 401) {
          dispatch(toggleAuthorize(false));
        }
        cb && cb(err);
      });
}

export function useRefreshToken() {
  return (dispatch) => {
    const refresh = localStorage.getItem('refresh_token');
    const errCb = () => dispatch(signout());

    if (refresh) {
      return AuthService.refresh({ refresh })
        .then((tokens) => {
          setTokens(tokens);
          dispatch(getUser());
        })
        .catch(errCb);
    }

    return errCb();
  };
}

export function init() {
  return (dispatch) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setApiHeaders({ Authorization: `Bearer ${accessToken}` });
      dispatch(getUser());

      const activeRole = localStorage.getItem('role');

      if (activeRole) {
        dispatch(setActiveRole(activeRole));
      }
    } else {
      console.log('here1');
      dispatch(useRefreshToken());
    }
  };
}

export function register(data, cb) {
  return (dispatch) =>
    AuthService.register(data)
      .then((user) => {
        const newCb = (err) => {
          if (err) {
            cb(err);
          } else {
            dispatch(getRoles(cb));
          }
        };

        dispatch(setUser(user));
        dispatch(obtainTokens(data, newCb));
      })
      .catch(cb);
}

export function login(data, cb) {
  return (dispatch) => {
    const newCb = (err) => {
      if (err) {
        cb(err);
      } else {
        dispatch(getUser(cb));
      }
    };

    dispatch(obtainTokens(data, newCb));
  };
}

reducerRegistry.register(reducerName, reducer);
