/*
 * @Description: 
 * @Author: xuks
 * @Date: 2020-11-16 15:01:27
 * @LastEditTime: 2020-11-16 15:17:10
 */
import instance, { get, post, upload } from './_axios';
import qs from 'qs';


export const _get = ({ url, data, options }) => {
  return get(url, data, options)
}

export const _post = ({ url, data, options }) => {
  let contentType = options.headers && options.headers['Content-Type'] || instance.defaults.headers['Content-Type'];
  if (data && /urlencoded/.test(contentType)) {
    data = qs.stringify(data);
  }
  return post(url, data, options);
}

export const _upload = ({ url, formData, options }) => {
  return upload(url, formData, options);
}

export const createApis = (opts = {}, appDomain = '') => {
  Object.entries(opts).forEach(([key, val]) => {
    let url = !/^http/.test(val.url) ? appDomain + val.url : val.url;
    let params = {
      url: url,
      options: val.options || { headers: instance.defaults.headers },
    };
    if (val.method.toUpperCase() === 'GET') {
      this[key] = (data, opt) => _get(Object.assign(params, opt && { url: opt.url || params.url, options: opt.options || params.options } || {}, { data }));
    } else if (val.method.toUpperCase() === 'POST') {
      this[key] = (data, opt) => _post(Object.assign(params, opt && { url: opt.url || params.url, options: opt.options || params.options } || {}, { data }));
    } else if (val.method.toUpperCase() === 'UPLOAD') {
      this[key] = (formData, opt) => _upload(Object.assign(params, opt && { url: opt.url || params.url, options: opt.options || params.options } || {}, { formData }));
    }
  });
}