const baseUrl = "http://localhost:8008/ordersrestapi";
const loginUrl = baseUrl + "/login/login";
const customerRestUrl = baseUrl + "/api/customers/";
const orderRestUrl = baseUrl + "/api/orders/";

import axiosApi from 'axios';
axiosApi.defaults.headers.post['Content-Type'] = 'application/json';
axiosApi.defaults.headers.put['Content-Type'] = 'application/json';
const axios = axiosApi;

// Process AJAX error during login attempt
const processAjaxLoginError = function(error) {
    let errorMsg = "";
    if (error.response) {
        if (error.response.status == 401) {
            errorMsg = error.response.data.message;
        }
        else {
            console.error("Response contains error code " + error.response.status);
        }
    }
    else if (error.request) {
        console.error("No response received so logging request");
        console.error(error.request);
    }
    else {
        console.error("Problem with request");
        console.error(error.message);
    }

    return errorMsg;
}

const processAjaxAuthError = function(error, router) {
    if (error.response) {
        if (error.response.status == 401) {
            console.log("401 error so redirect to login");
            router.push("/login");
        }
        else {
            console.error("Response contains error code " + error.response.status);
        }
    }
    else if (error.request) {
        console.error("No response received so logging request");
        console.error(error.request);
    }
    else {
        console.error("Problem with request");
        console.error(error.message);
    }
}

export { loginUrl, customerRestUrl, orderRestUrl, axios, processAjaxLoginError, processAjaxAuthError }