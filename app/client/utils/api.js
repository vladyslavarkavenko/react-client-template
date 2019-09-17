import axios from 'axios';

import CONFIG from '../config';
import { redirectTo } from '../modules/redirect';
import { useRefreshToken } from '../modules/auth';

const instance = axios.create({ baseURL: `${CONFIG.APP_URL}/api` });

const request = (method, url, data) => new Promise((resolve, reject) => {
  (() => {
    if (method === 'get') {
      return instance.request({
        url, method, params: data, headers: {},
      });
    }
    return instance.request({
      url, method, data, headers: {},
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

export function addResponseIntercept(store) {
  instance.interceptors.response.use(
    response => response,
    (err) => {
      const { response: { status } } = err;

      if (status === 404) {
        store.dispatch(redirectTo(routing().notFound));
      }

      if (status === 401) {
        store.dispatch(useRefreshToken());
      }

      return Promise.reject(err);
    },
  );
}

export default {
  get: (endpoint, data) => request('get', endpoint, data),
  post: (endpoint, data) => request('post', endpoint, data),
  put: (endpoint, data) => request('put', endpoint, data),
  del: (endpoint, data) => request('delete', endpoint, data),
  patch: (endpoint, data) => request('patch', endpoint, data),
};
