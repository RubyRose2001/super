let error = {};

/**
 * 接口返回status处理
 */
const redirectTo = () => {
  if (error.response.status === 404) {
    // alert('接口找不到，找后端去！');
  }
};

export default {
  doError: (err) => {
    error = err || {};
    redirectTo();
  }
};
