import axios from 'axios';

import CONFIG from '../config';

const instance = axios.create({ baseURL: `${CONFIG.API_URL}/api` });

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

export default {
  get: (endpoint, data) => request('get', endpoint, data),
  post: (endpoint, data) => request('post', endpoint, data),
  put: (endpoint, data) => request('put', endpoint, data),
  del: (endpoint, data) => request('delete', endpoint, data),
};
