const baseUrl = "http://localhost:8008/ordersrestapi";
const loginUrl = baseUrl + "/login";
const logoutUrl = baseUrl + "/api/logout";
const customerRestUrl = baseUrl + "/api/customers/";
const orderRestUrl = baseUrl + "/api/orders/";
const lineItemRestUrl = baseUrl + "/api/lineitems/";

import axiosApi from 'axios';
axiosApi.defaults.headers.post['Content-Type'] = 'application/json';
axiosApi.defaults.headers.put['Content-Type'] = 'application/json';
const axios = axiosApi;
const stateList = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

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
        console.error("Problem with request: " + error.message);
    }

    return errorMsg;
}

const processValidationErrors = function(error) {
    let retVal = [];
    if (error.response) {
        if (error.response.status == 400) {
            // Validation error
            //console.log('validation error');
            retVal = error.response.data;
        }
    }
    return retVal;
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
        console.error("Problem with request: " + error.message);
    }
}

const getOrderStatusStr = function(status) {
    let statusStr = "Unknown";

    switch(status) {
        case 1:
            statusStr = "Pending";
            break;
        case 2:
            statusStr = "Processing";
            break;
        case 3:
            statusStr = "Rejected";
            break;
        case 4:
            statusStr = "Completed";
    }

    return statusStr;
}

const getValidationError = function(fieldName) {
    var returnValue;

    var foundElement = this.validationErrors.find(function (element) {
        return element.field === fieldName;
    });

    if (foundElement !== undefined) {
        returnValue = foundElement.message;
    }

    return returnValue;
}

const formatDate = function(milliseconds) {
    if (!milliseconds)
        return;

    let date = new Date(milliseconds);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}


export {
    loginUrl,
    logoutUrl,
    customerRestUrl,
    orderRestUrl,
    lineItemRestUrl,
    axios,
    processAjaxLoginError,
    processAjaxAuthError,
    processValidationErrors,
    getOrderStatusStr,
    getValidationError,
    formatDate,
    stateList
}