import axios from 'axios';
import Intcp from './http.intcp';

export const instance = axios.create({
  baseURL: '/',
  timeout: 1000,
  headers: {
    "content-type": "application/json"
  }
})

function axiosPost(url, data, config) {
  Intcp.interceptors(config);
  const promise = new Promise((resolve, reject) => {
    instance.post(url, data).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err);
    });
  });
  return promise;
}

function axiosGet(url, params, config) {
  Intcp.interceptors(config);
  const promise = new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      response.data = response.data || {};
      resolve(response.data);
    }).catch((err) => {
      reject(err);
    });
  });
  return promise;
}
function axiosDelete(url, params, config) {
  Intcp.interceptors(config);
  const promise = new Promise((resolve, reject) => {
    instance.delete(url, params).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err);
    });
  });
  return promise;
}

function axiosPut(url, params, config) {
  Intcp.interceptors(config);
  const promise = new Promise((resolve, reject) => {
    instance.put(url, params).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err);
    });
  });
  return promise;
}

function axiosPatch(url, params, config) {
  Intcp.interceptors(config);
  const promise = new Promise((resolve, reject) => {
    instance.patch(url, params).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err);
    });
  });
  return promise;
}

function postFormData (url, params, config) {
  Intcp.interceptors(config);
  const formData = new FormData();
  Object.keys(params).forEach(key => {
    formData.append(key, params[key]);
  });
  const promise = new Promise((resolve, reject) => {
    instance.post(url, formData).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
  return promise;
}

export default {
  post: axiosPost,
  get: axiosGet,
  delete: axiosDelete,
  put: axiosPut,
  patch: axiosPatch,
  postFormData
};
