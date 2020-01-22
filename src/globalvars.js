const customerRestUrl = "http://localhost:8080/springrestservice/api/customers/";
const orderRestUrl = "http://localhost:8080/springrestservice/api/orders/";

import axiosApi from 'axios';
axiosApi.defaults.headers.post['Content-Type'] = 'application/json';
axiosApi.defaults.headers.put['Content-Type'] = 'application/json';
const axios = axiosApi;

export { customerRestUrl, orderRestUrl, axios }