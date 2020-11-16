/*
 * @Description: 
 * @Author: xuks
 * @Date: 2020-11-16 15:06:00
 * @LastEditTime: 2020-11-16 15:09:19
 */
const instance = window.axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
});

function streamType (config) {
  return ['blob', 'arraybuffer'].includes(config.responseType)
}

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.error(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 304) {
      if (response.data.errcode === undefined) {
        if (!streamType(response.config)) {
          response.data.errmsg = '请设置responseType！';
        }
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    let response = { 'status': -404, 'statusText': '本地网络错误' };
    return Promise.reject(error.response || response);
  },
);

/**
 * 响应format
 * @param response
 * @param format
 * @returns {{errcode: (*|number), data: *, errmsg: (string|*)}|{errcode: (number|string), data: *, statusText: (string|*|string), errmsg: string}|*}
 */
function responseFormat (response, format = false) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    if (format && (response.data.errcode || response.data.code)) {
      return {
        errcode: response.data.errcode || responseCodeFormat(response.data.code),
        errmsg: response.data.errmsg || response.data.msg,
        data: response.data.data || response.data.data,
      };
    } else {
      if (streamType(response.config)) { // 流类型直接返回
        return response
      }
      return response.data;
    }
  }

  // 异常状态下，保持格式统一
  return {
    errcode: response.status,
    errmsg: '请检查网络或稍后重试(' + response.status + ')',
    statusText: response.statusText,
    data: response.data,
  };
}

function responseCodeFormat (code) {
  // 代表成功的code 统一返回 0
  let errcode = ['0', 0, 200, '200'];
  if (errcode.includes(code)) {
    return 0
  }
  return code
}

export async function get (url, params, options = {}) {
  let send = {
    timeout: options.timeout || instance.defaults.timeout,
    method: 'get',
    url,
    params: params,
    headers: options.headers,
    cancelToken: new window.axios.CancelToken(function executor (c) {
      // executor 函数接收一个 cancel 函数作为参数
      typeof options.setCancel === 'function' && options.setCancel(c);
    }),
    responseType: options.responseType || 'json',
  };
  return instance(send).then(
    (response) => {
      return responseFormat(response, true);
    },
  );
}

export async function post (url, data, options = {}) {
  let send = {
    timeout: options.timeout || instance.defaults.timeout,
    method: 'post',
    url,
    data: data,
    headers: options.headers,
    cancelToken: new window.axios.CancelToken(function executor (c) {
      // executor 函数接收一个 cancel 函数作为参数
      typeof options.setCancel === 'function' && options.setCancel(c);
    }),
    responseType: options.responseType || 'json',
  };
  return instance(send).then(
    (response) => {
      return responseFormat(response, true);
    },
  );
}

export async function upload (url, formData, options = {}) {
  let send = {
    timeout: options.timeout || 30000, // 上传默认30秒
    method: 'post',
    url,
    data: formData,
    headers: Object.assign({}, options.headers, { 'Content-Type': 'multipart/form-data' }),
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      typeof options.onUploadProgress === 'function' && options.onUploadProgress(progressEvent);
      // Do whatever you want with the native progress event
    },
    cancelToken: new window.axios.CancelToken(function executor (c) {
      // executor 函数接收一个 cancel 函数作为参数
      typeof options.setCancel === 'function' && options.setCancel(c);
    }),
  };
  return instance(send).then(
    (response) => {
      return responseFormat(response);
    },
  );
}


export default instance;
