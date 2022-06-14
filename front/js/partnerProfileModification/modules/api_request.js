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

  return {
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
