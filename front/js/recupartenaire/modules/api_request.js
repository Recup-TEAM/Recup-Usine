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
  function request_reset_change_password_user() {
    console.log("Changement de mot de passe");
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/user/update/resetPassword/",
      async: false,
      data: {
        password: $("#new-password").val(),
        id_user: getUrlParameter("id_user"),
        temp_pswd: getUrlParameter("temp_pswd"),
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
      },
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

  function request_getUserData() {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/user/get/data/",
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

  // request_deleteEntreprise
  function request_deleteEntreprise(id) {
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/entreprises/delete/entrepriseById/" + id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // request_changeSubscriptionDuration
  function request_changeSubscriptionDuration(id, duration) {
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/user/change/subscriptionDuration/",
      data: {
        id: id,
        duration: duration,
      },
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // getAllEntrepriseOfUser
  ///api/entreprises/get/allEntreprisesByUser
  function request_getAllEntrepriseOfUser(user_id) {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/entreprises/get/allEntreprisesByUser/" + user_id,
      async: false,
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  // request_getOrdersData
  function request_getOrdersData(user_id) {
    let dataSucces;
    $.ajax({
      type: "GET",
      url: "/api/orders/get/orderByIdUser/" + user_id,
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
    getUserData() {
      return request_getUserData();
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
    },
    deleteEntreprise(id) {
      return request_deleteEntreprise(id);
    },
    changeSubscriptionDuration(id, duration) {
      return request_changeSubscriptionDuration(id, duration);
    },
    getAllEntrepriseOfUser(id) {
      return request_getAllEntrepriseOfUser(id);
    },
    reset_change_password_user() {
      return request_reset_change_password_user();
    },

    getOrdersData(id) {
      return request_getOrdersData(id);
    }

  };
})();
