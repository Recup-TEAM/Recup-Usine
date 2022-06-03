let logger = (function () {
  function request_change_mail_user(email) {
    console.log(email + " essaye de se connecter");
    $.ajax({
      type: "POST",
      url: "/api/user/changeMail/",
      data: {
        email: email,
      },
      success: (data) => {
        console.log(data);
        //window.location.href = "/";
      },
    });
  }

  function request_change_password_user(password) {
    $.ajax({
      type: "POST",
      url: "/api/user/changePassword/",
      data: {
        password: $("#password").val(),
      },
      success: (data) => {
        console.log(data);
        //window.location.href = "/";
      },
    });
  }

  return {
    change_mail_user(email) {
      request_change_mail_user(email);
    },
    change_password_user(password) {
      request_change_password_user(password);
    },
    
  };
})();
