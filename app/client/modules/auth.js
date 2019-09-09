import { setApiHeaders } from '../utils/api';
import reducerRegistry from '../utils/reducerRegistry';
import AuthService from '../services/auth';

const reducerName = 'auth';

const createActionName = name => `app/${reducerName}/${name}`;

const SET_USER = createActionName('SET_USER');
const AUTHORIZE = createActionName('AUTHORIZE');

const initialState = {
  user: null,
  isAuthorized: null,
  // activeRole: 'CUSTOMER',
  // roles: { 'CUSTOMER': [id], 'BANKER': id, 'ANALYST': id, 'ADMIN': id},
  // companies: {id: {}},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case AUTHORIZE:
      return {
        ...state,
        isAuthorized: action.isAuthorized,
      };
    default:
      return state;
  }
}

export const setTokens = ({ access, refresh }) => {
  if (access) {
    localStorage.setItem('access_token', access);
    setApiHeaders({ Authorization: `Bearer ${access}` });
  }
  if (refresh) {
    localStorage.setItem('refresh_token', refresh);
  }
};

const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setApiHeaders({ Authorization: '' });
};

// Helper actions
const setUser = user => ({
  user,
  type: SET_USER,
});

const toggleAuthorize = (isAuthorized = true) => ({
  isAuthorized,
  type: AUTHORIZE,
});

function obtainTokens(data, cb) {
  return dispatch => AuthService.obtainTokens(data)
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

// External actions
export function useRefreshToken(cb) {
  return (dispatch) => {
    const refresh = localStorage.getItem('refresh_token');
    const errCb = (err = true) => {
      dispatch(toggleAuthorize(false));
      removeTokens();
      cb(err);
    };

    if (refresh) {
      return AuthService.refresh({ refresh })
        .then((tokens) => {
          setTokens(tokens);
          dispatch(toggleAuthorize());
          cb();
        })
        .catch(errCb);
    }

    return errCb();
  };
}

// export function getRoles() {
//   return () => AuthService.getRoles()
//     .then(console.log)
//     .catch(console.log);
// }

export function getUser(cb) {
  return dispatch => AuthService.getUser()
    .then((user) => {
      dispatch(setUser(user));
      // dispatch(getRoles());
      dispatch(toggleAuthorize());
      cb && cb();
    })
    .catch((err) => {
      // If 401 we try to use refresh token.( Axios interceptor )
      if (err.status !== 401) {
        dispatch(toggleAuthorize(false));
      }
      cb && cb(err);
    });
}

export function login(data, cb) {
  return (dispatch) => {
    const newCb = (err) => {
      if (err) {
        return cb(err);
      }
      return dispatch(getUser(cb));
    };

    dispatch(obtainTokens(data, newCb));
  };
}

export function register(data, cb) {
  return dispatch => AuthService.register(data)
    .then((user) => {
      dispatch(setUser(user));
      dispatch(obtainTokens(data, cb));
    })
    .catch(cb);
}

reducerRegistry.register(reducerName, reducer);
