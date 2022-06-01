let logger = (function () {
  function request_signup(email, password) {
    console.log(email + " essaye de se connecter");
    $.ajax({
      type: "POST",
      url: "/user/signup/",
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
    sign_up(email, password) {
      request_signup(email, password);
    },
  };
})();
