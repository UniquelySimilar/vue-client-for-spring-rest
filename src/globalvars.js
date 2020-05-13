const baseUrl = "http://localhost:8008/ordersrestapi";
const loginUrl = baseUrl + "/login/login";
const customerRestUrl = baseUrl + "/api/customers/";
const orderRestUrl = baseUrl + "/api/orders/";

import axiosApi from 'axios';
axiosApi.defaults.headers.post['Content-Type'] = 'application/json';
axiosApi.defaults.headers.put['Content-Type'] = 'application/json';
const axios = axiosApi;

export { loginUrl, customerRestUrl, orderRestUrl, axios }