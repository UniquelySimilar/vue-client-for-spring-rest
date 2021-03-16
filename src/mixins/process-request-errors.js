const processRequestErrors = {
  methods: {
    // Process AJAX error during login attempt
    processAjaxLoginError(error) {
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
    },
    processAjaxAuthError(error, router) {
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

  }
}

export default processRequestErrors;