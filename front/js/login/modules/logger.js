let logger = (function () {
  function request_login(email, password) {
    let dataSucces;
    console.log(email + " essaye de se connecter avec le mot de passe " + password);
    $.ajax({
      type: "POST",
      url: "/api/user/login/",
      async: false,
      data: {
        email: email,
        password: password,
      },
      success: (data) => {
        dataSucces = data;
      }
    });
    return dataSucces;
  }

  return {
    sign_in(email, password) {
      return request_login(email, password);
    },
  };
})();
