function changeMail() {
  if (
    $("#newEmail").val() == $("#confirmNewMail").val() &&
    isValidEmail($("#newEmail").val())
  ) {
    data = api_request.change_mail_user($("#newEmail").val());
    if (data.success) {
      $("#newEmail").val("");
      $("#confirmNewMail").val("");
      alert("Votre email a bien été modifié");
    }
  } else {
    alert("Les deux emails ne correspondent pas ou l'email n'est pas valide");
  }
}

function changePassword() {
  if (
    $("#newPassword").val() == $("#confirmNewPassword").val()
    // &&
   // isValidPassword($("#newPassword").val())
  ) {
    data = api_request.change_password_user();
    if (data.success) {
      $("#oldPassword").val("");
      $("#newPassword").val("");
      $("#confirmNewPassword").val("");
      alert("Votre mot de passe a bien été modifié");
    }
    else {
      alert("L'ancien mot de passe est incorrect");
    }
  } else {
    alert(
      "Votre mot de passe n'est pas valide ou les deux mots de passe ne correspondent pas"
    );
  }
}

// verify if the email is valid
function isValidEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// verify if the password is valid (at least 6 characters, 1 uppercase, 1 lowercase, 1 number)
function isValidPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  console.log(re.test(String(password)));
  return re.test(String(password));
}

$(document).ready(function () {
  /* INIT */
  //if already logged in, redirect to home page
  $.ajax({
    url: "/api/user/get/connected",
    type: "GET",
    success: function (data) {
      if (!data.connected) {
        window.location.href = "/";
      }
    },
  });

  // get entreprise name
  $.ajax({
    url: "/api/entreprise/get/data",
    type: "GET",
    success: function (result) {
      console.log(result);
      $("#entrepriseName").html(result.data[0].name);
    },
  });

  // get user data
  $.ajax({
    url: "/api/user/get/data",
    type: "GET",
    success: function (result) {
      console.log("user: ", result.data);
      $("#userMail").html(result.data.email);
      // convert sql dateRegister to date
      var date = new Date(result.data.registerDate);
      var dateRegister =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      $("#dateRegister").html(dateRegister);

      if (result.data.compte_level == 0) {
        $("#userLevel").html("Utilisateur");
      } else if (result.data.compte_level == 1) {
        $("#userLevel").html("Récupartner");
      } else {
        $("#userLevel").html("Compte de type : " + result.data.compte_level);
      }
    },
  });

  $.ajax({
    url: "/api/user/get/subscription",
    type: "GET",
    success: function (result) {
      console.log("subscription: ", result.data);
      // if array is empty
      if (result.data.length == 0) {
        $("#subscription").html("Aucune souscription");
      } else {
        let dateEnd = new Date(result.data[0].start_date);
        dateEnd.setMonth(dateEnd.getMonth() + result.data[0].subscription_type);
        if (dateEnd.getMonth() > 12) {
          dateEnd.setMonth(dateEnd.getMonth() - 12);
          dateEnd.setFullYear(dateEnd.getFullYear() + 1);
        }
        date_end_format = dateEnd.getDay() + "/" + (dateEnd.getMonth() + 1) + "/" + dateEnd.getFullYear();

        $("#dateRenouvellement").html(date_end_format);
      }
    },
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
