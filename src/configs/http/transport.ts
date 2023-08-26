import httpHandler from "./axios";
// import { API_DOMAIN } from "../constant/httpConstant";

function get(domain: string, url: string, config = {}) {
  return httpHandler(domain).get(`${url}`, config);
}

function post(domain: string, url: string, data: any, config = {}) {
  return httpHandler(domain).post(`${url}`, data, config);
}

function put(domain: string, url: string, data: any, config = {}) {
  return httpHandler(domain).put(`${url}`, data, config);
}

function del(domain: string, url: string, config = {}) {
  return httpHandler(domain).delete(`${url}`, config);
}

// export const userTransport = {
//   get: (url, config = {}) => {
//     return get(API_DOMAIN.USER, url, config);
//   },
//   post: (url, data, config = {}) => {
//     return post(API_DOMAIN.USER, url, data, config);
//   },
//   put: (url, data, config = {}) => {
//     return put(API_DOMAIN.USER, url, data, config);
//   },
//   delete: (url, config = {}) => {
//     return del(API_DOMAIN.USER, url, config);
//   },
// };
