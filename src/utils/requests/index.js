/*
 * @Description: 
 * @Author: xuks
 * @Date: 2020-11-16 15:01:27
 * @LastEditTime: 2020-11-17 17:20:41
 */
import instance, { get, post, upload } from './_axios';
import qs from 'qs';

const _get = ({ url, data, options }) => {
  return get(url, data, options)
}

const _post = ({ url, data, options }) => {
  let contentType = options.headers && options.headers['Content-Type'] || instance.defaults.headers['Content-Type'];
  if (data && /urlencoded/.test(contentType)) {
    data = qs.stringify(data);
  }
  return post(url, data, options);
}

const _upload = ({ url, formData, options }) => {
  return upload(url, formData, options);
}

const createApis = (opts = {}, appDomain = '') => {
  let obj = Object.create(null);
  Object.entries(opts).forEach(([key, val]) => {
    let url = !/^http/.test(val.url) ? appDomain + val.url : val.url;
    let params = {
      url: url,
      options: val.options || { headers: instance.defaults.headers },
    };
    let opt = {}
    if (val.method.toUpperCase() === 'GET') {
      obj[key] = (data, fn) => {
        if (typeof fn === 'function') {
          opt = fn(params)
        }
        return _get(Object.assign(params, opt || {}, { data }))
      }
    } else if (val.method.toUpperCase() === 'POST') {
      obj[key] = (data, fn) => {
        if (typeof fn === 'function') {
          opt = fn(params)
        }
        return _post(Object.assign(params, opt || {}, { data }))
      }
    } else if (val.method.toUpperCase() === 'UPLOAD') {
      obj[key] = (formData, fn) => {
        if (typeof fn === 'function') {
          opt = fn(params)
        }
        return _upload(Object.assign(formData, opt || {}, { formData }))
      }
      
    }
  });
  return obj
}

export default createApis