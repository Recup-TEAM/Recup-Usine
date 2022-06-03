let api_request = (function () {
  function request_change_mail_user(email) {
    console.log("Changement de mail");
    $.ajax({
      type: "POST",
      url: "/api/user/update/changeMail",
      data: {
        "newMail": email,
      },
      success: (data) => {
        console.log(data);
        return data;
        },
    });
  }

  function request_change_password_user(oldPassword, newPassword) {
    console.log("Changement de mot de passe");
    $.ajax({
      type: "POST",
      url: "/api/user/update/changePassword",
      data: {
        oldPassword: $("#oldPassword").val(),
        newPassword: $("#newPassword").val(),
      },
      success: (data) => {
        console.log(data);
        return data;
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
