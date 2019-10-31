import axios from 'axios';

import CONFIG from './config';
import { refreshTokenWorker } from '../modules/auth/authActions';
import { clearLocalStorage } from '../modules/helpers/helpers';

const { APP_URL, SESSION_TIME } = CONFIG;

const instance = axios.create({
  baseURL: `${APP_URL}/api`
});

export function setApiHeaders(headers) {
  Object.keys(headers).forEach((header) => {
    instance.defaults.headers.common[header] = headers[header];
  });
}

(function() {
  const now = Date.now();
  const rememberMe = +localStorage.getItem('rememberMe');
  const lastRequest = +localStorage.getItem('lastRequest');

  console.log('SESSION_TIME', SESSION_TIME);
  if (!rememberMe && lastRequest && now - lastRequest >= SESSION_TIME) {
    clearLocalStorage();
  }
})();

export function addRequestIntercept() {
  instance.interceptors.request.use((config) => {
    const now = Date.now();

    localStorage.setItem('lastRequest', now.toString());

    return config;
  });
}

export function addResponseIntercept(store) {
  instance.interceptors.response.use(
    (response) => response.data,
    (err) => {
      const originalRequest = err.config;
      const {
        response: { status }
      } = err;

      if (
        status === 401 &&
        !originalRequest.url.includes('/core/token/refresh/') &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return store
          .runSaga(refreshTokenWorker)
          .toPromise()
          .then((tokens) => {
            originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
            return instance(originalRequest);
          })
          .catch((sagaErr) => {
            Promise.reject(sagaErr);
          });
      }

      //other errors
      return Promise.reject(err);
    }
  );
}

export default instance;
