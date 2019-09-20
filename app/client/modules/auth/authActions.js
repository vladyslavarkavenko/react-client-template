import { call, select, put, takeLatest, all } from 'redux-saga/effects';
import createRequestRoutine from '../helpers/createRequestRoutine';
import AuthService from '../../services/auth';
import { setTokens, removeTokens } from '../helpers/helpers';
import { TOKENS } from '../../utils/constants';
import routing from '../../utils/routing';
import { historyPush } from '../redirect/redirectActions';
import authSelectors from './authSelectors';
import companiesSelectors from '../companies/companiesSelectors';

export const prefix = 'auth';
const createRequestBound = createRequestRoutine.bind(null, prefix);

// const setUser = createRequestBound('USER_SET');
export const setActiveRole = createRequestBound('ACTIVE_ROLE_SET');
// const setRole = createRequestBound('ROLE_SET');
// const setAuthorize = createRequestBound('AUTHORIZE_SET');

export const pushLogin = createRequestBound('LOGIN_PUSH');
export const pushLoginByToken = createRequestBound('LOGIN_BY_TOKEN_PUSH');

export const pushSignUp = createRequestBound('SIGNUP_PUSH');
export const pushLogout = createRequestBound('LOGOUT_PUSH');
export const pushRefreshToken = createRequestBound('REFRESH_TOKEN_PUSH');

function* setActiveRoleWorker({ payload }) {
  localStorage.setItem('role', payload);

  const permissions = yield select(authSelectors.rolesPermissions);
  const companies = yield select(companiesSelectors.data);

  const data = {
    role: payload,
    company: companies[permissions[payload]]
  };

  yield put(setActiveRole.success(data));
}

function* refreshTokenWorker() {
  const refreshToken = localStorage.getItem(TOKENS.REFRESH);

  if (refreshToken) {
    try {
      const res = yield call(() => AuthService.refresh({ refresh: refreshToken }));
      setTokens(res.data.tokens);
    } catch (err) {
      removeTokens();
      console.error(err);
    }
  }
}

// Running once at application start
function* loginByTokenWorker() {
  const accessToken = localStorage.getItem(TOKENS.ACCESS);
  const refreshToken = localStorage.getItem(TOKENS.REFRESH);
  // proceed login
  if (accessToken) {
    yield put(pushLoginByToken.request());
    setTokens({ access: accessToken, refresh: refreshToken });

    // TODO: Invalid token refreshing logic
    // if (!accessToken && refreshToken) {
    //   // wait until tokens are refreshing
    //   yield fork(refreshTokenWorker);
    // }

    try {
      const [user, roles] = yield all([
        call(() => AuthService.getUser()),
        call(() => AuthService.getRoles())
      ]);

      const role = localStorage.getItem('role');

      if (role) {
        yield put(setActiveRole.success(role));
      }

      yield put(pushLoginByToken.success({ user, roles }));
    } catch (err) {
      console.error(err);
      removeTokens();
      yield put(pushLoginByToken.failure());
    }
  }
}

function* loginWorker({ payload: { email, password } }) {
  yield put(pushLogin.request());
  try {
    const tokenRes = yield call(() => AuthService.obtainTokens({ email, password }));
    setTokens(tokenRes);

    const [user, roles] = yield all([
      call(() => AuthService.getUser()),
      call(() => AuthService.getRoles())
    ]);
    // format roles by formatRolesPayload in reducer;
    const role = localStorage.getItem('role');

    if (role) {
      yield put(setActiveRole.success(role));
    }

    yield put(
      pushLogin.success({
        user,
        roles
      })
    );

    yield put(historyPush(routing().account));
  } catch (err) {
    console.error(err);
    yield put(pushLogin.failure());
  }
}

function* logoutWorker() {
  yield removeTokens();
}

function* signUpWorker({ payload: { input } }) {
  yield put(pushSignUp.request());

  try {
    yield call(() => AuthService.register(input));
    // start Sign In
    yield put(pushLogin({ email: input.email, password: input.password }));

    yield put(pushSignUp.success());
  } catch (err) {
    yield put(pushSignUp.failure());
  }
}

export function* authWatcher() {
  yield all([
    takeLatest(pushLogin.TRIGGER, loginWorker),
    takeLatest(pushLoginByToken.TRIGGER, loginByTokenWorker),
    takeLatest(pushRefreshToken.TRIGGER, refreshTokenWorker),
    takeLatest(pushLogout.TRIGGER, logoutWorker),
    takeLatest(pushSignUp.TRIGGER, signUpWorker),

    takeLatest(setActiveRole.TRIGGER, setActiveRoleWorker)
  ]);
}
