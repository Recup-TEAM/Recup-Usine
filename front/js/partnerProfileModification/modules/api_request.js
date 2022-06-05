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
        oldPassword: $("#oldPassword").val(),
        newPassword: $("#newPassword").val(),
      },
      success: (data) => {
        console.log(data);
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  return {
    change_mail_user(email) {
      return request_change_mail_user(email);
    },
    change_password_user() {
      return request_change_password_user();
    },
  };
})();
