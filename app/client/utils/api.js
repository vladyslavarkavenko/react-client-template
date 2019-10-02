import axios from 'axios';

import CONFIG from './config';
import { refreshTokenWorker } from '../modules/auth/authActions';

const instance = axios.create({ baseURL: `${CONFIG.APP_URL}/api` });

const request = (method, url, data) =>
  new Promise((resolve, reject) => {
    (() => {
      if (method === 'get') {
        return instance.request({
          url,
          method,
          params: data,
          headers: {}
        });
      }
      return instance.request({
        url,
        method,
        data,
        headers: {}
      });
    })()
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });

export function setApiHeaders(headers) {
  Object.keys(headers).forEach((header) => {
    instance.defaults.headers.common[header] = headers[header];
  });
}

/* eslint-disable */
export function addResponseIntercept(store) {
  instance.interceptors.response.use(
    (response) => response,
    (err) => {
      const originalRequest = err.config;
      const {
        response: { status }
      } = err;

      //not axios error
      if (!err.response) {
        return Promise.reject(err);
      }

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        return store
          .runSaga(refreshTokenWorker, { request: originalRequest })
          .toPromise()
          .then(({ request, tokens }) => {
            console.log('res', request, tokens);

            originalRequest.headers.Authorization = `Bearer ${tokens.access}`;

            return instance(originalRequest);
          })
          .catch((sagaErr) => {
            console.error(sagaErr);
          });
      }

      return err.response;
    }
  );
}

export default {
  get: (endpoint, data) => request('get', endpoint, data),
  post: (endpoint, data) => request('post', endpoint, data),
  put: (endpoint, data) => request('put', endpoint, data),
  del: (endpoint, data) => request('delete', endpoint, data),
  patch: (endpoint, data) => request('patch', endpoint, data)
};
