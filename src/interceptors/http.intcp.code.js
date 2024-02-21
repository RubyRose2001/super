// import { ElNotification } from 'element-plus';

let req = {};
// let notif = null;

/**
 * 对接口返回的code进行统一处理
 */
const processorCode = (resolve) => {
  try {
    const code = req.data.code; // eslint-disable-line
    // token失效，跳转到登录页面
    if (code === 1100) {
      window.localStorage.setItem('token', '');
    } else if (code !== 0) {
      resolve(req.data);
      // if (notif) {
      //   notif.close();
      // }
      // notif = ElNotification.error({
      //   title: '',
      //   message: '客户端请求服务异常',
      //   offset: 50
      // });
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  doCode: (request, resolve) => {
    req = request || {};
    processorCode(resolve);
  }
};
