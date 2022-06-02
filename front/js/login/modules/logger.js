let logger = (function () {
  function request_login(email, password) {
    console.log(email + " essaye de se connecter");
    $.ajax({
      type: "POST",
      url: "/api/user/login/",
      data: {
        email: email,
        password: password,
      },
      success: (data) => {
        console.log(data);
        window.location.href = "/";
      },
    });
  }

  return {
    sign_in(email, password) {
      request_login(email, password);
    },
  };
})();
