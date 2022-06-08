let api_request = (function () {
  // is c
  function request_isconnected() {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/user/get/connected",
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // get all enterprise
  function request_getAllEnterprise() {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/entreprises/get/allEntreprises",
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  return {
    isConnected() {
      return request_isconnected();
    },
    getAllEnterprise() {
      return request_getAllEnterprise();
    },
  };
})();
