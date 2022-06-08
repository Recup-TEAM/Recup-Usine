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

  // get one enterprise
  function request_getOneEntreprise(id) {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/entreprises/get/entrepriseById/" + id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // get user
  function request_getUserData(user_id) {
    console.log(user_id);
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/user/get/userById/" + user_id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // get user subscription
  function request_getUserSubscription(user_id) {

    let dataSucces;
      $.ajax({
        type: "GET",
        url: "/api/user/get/subscriptionById/" + user_id,
        async: false,
        success: (data) => {
          dataSucces = data;
        },
      });
      return dataSucces;
    }

  // request_changeSubscriptionPrice
  function request_changeSubscriptionPrice(id, price) {
    console.log(id);
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/user/change/subscriptionPrice/",
      data: {
        id: id,
        price: price,
      },
      async: false,
      success: (data) => {
        console.log("t", data);
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
    getOneEntreprise(id) {
      return request_getOneEntreprise(id);
    },
    //get user data
    getUserData(user_id) {
      return request_getUserData(user_id);
    },

    // get user subscription
    getUserSubscription(user_id) {
      return request_getUserSubscription(user_id);
    },

    // changeSubscriptionPrice
    changeSubscriptionPrice(user_id, newPrice) {
      return request_changeSubscriptionPrice(user_id, newPrice);
    },
  };
})();
