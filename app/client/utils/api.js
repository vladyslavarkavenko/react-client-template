import axios from 'axios';

import CONFIG from './config';
import { refreshTokenWorker } from '../modules/auth/authActions';

const instance = axios.create({
  baseURL: `${CONFIG.APP_URL}/api`
});

// const request = (method, url, data) =>
//   new Promise((resolve) => {
//     if (method === 'get') {
//       return instance
//         .request({
//           url,
//           method,
//           params: data,
//           headers: {}
//         })
//         .then((res) => resolve(res.data));
//     }
//     return instance
//       .request({
//         url,
//         method,
//         data,
//         headers: {}
//       })
//       .then((res) => resolve(res.data));
//   });
// // .catch((err) => {
// //   reject(err.response);
// // });

export function setApiHeaders(headers) {
  Object.keys(headers).forEach((header) => {
    instance.defaults.headers.common[header] = headers[header];
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

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        return store
          .runSaga(refreshTokenWorker)
          .toPromise()
          .then(({ tokens }) => {
            originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
            return instance(originalRequest);
          })
          .catch((sagaErr) => {
            console.error(sagaErr);
          });
      }

      //other errors
      return Promise.reject(err);
    }
  );
}

export default instance;
