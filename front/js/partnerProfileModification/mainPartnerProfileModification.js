function changeMail() {
  if ($("#newEmail").val() == $("#confirmNewMail").val()) {
    data = api_request.change_mail_user($("#newEmail").val());
    console.log("truc", data);
      if (data.status) {
        $("#userMail").html(email);
        $("#newEmail").val("");
        $("#confirmNewMail").val("");
        alert("Votre adresse mail a bien été modifiée");
      }

  }
}

function changePassword() {
  if ($("#newPassword").val() == $("#confirmNewPassword").val()) {
    data =api_request.change_password_user($("#newPassword").val());
    if (data.status) {
        $("#oldPassword").val("");
        $("#newPassword").val("");
        $("#confirmNewPassword").val("");
        alert("Votre mot de passe a bien été modifié");
      }
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
    url: "/api/entreprise/get/data",
    type: "GET",
    success: function (result) {
        console.log(result)
      $("#entrepriseName").html(result.data[0].name);
    },
  });

  // get user data
    $.ajax({
        url: "/api/user/get/data",
        type: "GET",
        success: function (result) {
            console.log(result.data);
            $("#userMail").html(result.data.email);
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
  $("#confirmButtonMailChange").click(function () {
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
