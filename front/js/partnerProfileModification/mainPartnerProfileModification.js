function changeMail() {
  if ($("#newEmail").val() == $("#confirmNewMail").val()) {
    api_request.change_mail_user($("#newEmail").val());
  }
}

function changePassword() {
  if ($("#newPassword").val() == $("#confirmNewPassword").val()) {
    api_request.change_password_user($("#newPassword").val());
  }
}

$(document).ready(function () {
    /* INIT */
  //if already logged in, redirect to home page
  $.ajax({
    url: "/api/user/get/connected",
    type: "GET",
    success: function (data) {
      if (!data.connected) {
        //window.location.href = "/";
      }
    },
  });

  // get entreprise name
  $.ajax({
    url: "/api/entreprises/get/entrepriseById",
    type: "GET",
    success: function (data) {
      console.log(data);
      $("#entreprise").val(data.entreprise);
    },
  });

  // get user data
    $.ajax({
        url: "/api/user/get/data",
        type: "GET",
        success: function (data) {
            console.log(data);
            //$("#name").val(data.name);
        }
    });


    /* LISTENERS */
  // when enter is pressed in newEmail focus confirmNewMail
  $("#newEmail").keypress(function (e) {
    if (e.which == 13) {
      $("#confirmNewMail").focus();
    }
  });

  // when enter is pressed in confirmNewMail and newEmail and confirmNewMail have the same value call changeMail function
  $("#confirmNewMail").keypress(function (e) {
    if (e.which == 13) {
      changeMail();
    }
  });

  // when confirmNewMail is clicked call changeMail function
  $("#confirmNewMail").click(function () {
    changeMail();
  });

  // when enter is pressed in oldPassword focus newPassword
  $("#oldPassword").keypress(function (e) {
    if (e.which == 13) {
      $("#newPassword").focus();
    }
  });

  // when enter is pressed in newPassword focus confirmNewPassword
  $("#newPassword").keypress(function (e) {
    if (e.which == 13) {
      $("#confirmNewPassword").focus();
    }
  });

  // when enter is pressed in confirmNewPassword and newPassword and confirmNewPassword have the same value call changePassword function
  $("#confirmNewPassword").keypress(function (e) {
    if (e.which == 13) {
      changePassword();
    }
  });

  // when confirmButtonPasswordChange is clicked call changePassword function
  $("#confirmButtonPasswordChange").click(function () {
    changePassword();
  });
});
