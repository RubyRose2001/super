import { instance } from './http.utils';
import Intcp from '../interceptors';

function interceptors(config) {
  // http请求拦截器
  instance.interceptors.request.use((req) => {
    Intcp.ReqHeader.setHeader(req, config);
    return req;
  }, error => Promise.reject(error));
  // http响应拦截器
  instance.interceptors.response.use((res) => {
    return new Promise((resolve, reject) => {
      Intcp.ResCode.doCode(res, reject);
      resolve(res);
    });
  }, (error) => {
    // Intcp.ResError.doError(error);
    return Promise.reject(error);
  });
}

export default {
  interceptors
};
