let api_request = (function () {
  function request_change_mail_user(email) {
    let dataSucces;
    console.log("Changement de mail");
    $.ajax({
      type: "POST",
      url: "/api/user/update/changeMail",
      async: false,
      data: {
        newMail: email,
      },
      success: (data) => {
        console.log("succes:", data);
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  function request_change_password_user() {
    console.log("Changement de mot de passe");
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/user/update/changePassword",
      async: false,
      data: {
        oldPassword: $("#oldpassword").val(),
        newPassword: $("#newPassword").val(),
      },
      success: (data) => {
        console.log(data);
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  function request_getOneEntreprise(id) {
    let dataSucces;
    console.log("getOneCollector");
    $.ajax({
      type: "GET",
      url: "/api/entreprises/get/entrepriseById/" + id,
      async: false,
      success: (data) => {
        console.log("succes:", data);
        dataSucces = data;
      }
    });
    return dataSucces;
  }

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

  function request_getUserById(id) {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/user/get/userById/" + id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  function request_getSubscription(id) {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/user/get/subscriptionById/" + id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // get products by entreprise id
  function request_getProductsByEntrepriseId(id) {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/products/get/allProductsFrom/" + id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }
// requestCollect
  function request_requestCollect(id) {
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/collector/request/collect/" + id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

// request_allProduct
function request_allProduct() {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/products/get/allProducts",
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }
// request all entreprise
function request_allEntreprise() {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/entreprises/get/allEntreprises/",
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

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
  function request_getAllCollector() {
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
    getAllCollector() {
      return request_getAllCollector();
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
    isConnected() {
      return request_isconnected();
    },
    change_mail_user(email) {
      return request_change_mail_user(email);
    },
    change_password_user() {
      return request_change_password_user();
    },
    getOneEntreprise(id) {
      return request_getOneEntreprise(id);
    },
    getUserById(id) {
      return request_getUserById(id);
    },
    getSubscription(id) {
      return request_getSubscription(id);
    },
    getProductsByEntrepriseId(id) {
      return request_getProductsByEntrepriseId(id);
    },
    requestCollect(id) {
      return request_requestCollect(id);
    },
    getAllProduct() {
      return request_allProduct();
    },
    getAllEntreprise() {
      return request_allEntreprise();
    }
  };
})();
