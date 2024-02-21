let req = {};
let configHeaders = {};

/**
 * 设置http请求headers，添加token
 */
const setToken = () => {
  try {
    if (window.localStorage.getItem('token') || process.env.NODE_ENV !== 'development') {
      req.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
    }
  } catch (e) {
    console.log(e);
  }
};

const setHeadersConfig = (key, value) => {
  // 配置所有axios.create可配置的参数
  // 如果是headers，扩展不替换
  const configKeys = [
    'baseURL',
    'transformRequest',
    'transformResponse',
    'headers',
    'paramsSerializer',
    'timeout',
    'withCredentials',
    'adapter',
    'auth',
    'responseType',
    'responseEncoding',
    'xsrfCookieName',
    'xsrfHeaderName',
    'onUploadProgress',
    'onDownloadProgress',
    'maxContentLength',
    'validateStatus',
    'maxRedirects',
    'socketPath',
    'httpAgent',
    'httpsAgent',
    'proxy',
    'cancelToken'
  ];
  if (key === 'headers') {
    req.headers = Object.assign(req.headers || {}, value);
    return
  }
  if (configKeys.indexOf(key) > -1) {
    req[key] = value;
  }
}
const setHeaders = () => {
  setToken();
  Object.keys(configHeaders).forEach((key) => {
    setHeadersConfig(key, configHeaders[key])
  });
};

/**
 * 给请求的url添加随机参数，避免在IE10下本地缓存的问题
 */
const setRParams = () => {
  try {
    let joinStr = '?r=';
    if (req.url.indexOf('&') > -1) {
      joinStr = '&r=';
    }
    joinStr += new Date().getTime();
    // mock模式下不添加随机参数
    if (req.url.indexOf('http://') < 0) {
      joinStr = '';
    }
    req.url += joinStr;
  } catch (e) {
    console.log(e);
  }
};
export default {
  setHeader: (request, config) => {
    req = request || {};
    configHeaders = config || {};
    setHeaders();
    if (request.method === 'get') {
      setRParams();
    }
  }
};
