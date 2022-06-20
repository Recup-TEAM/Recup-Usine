function changeMail() {
  if (
    $("#new-email").val() == $("#confirm-email").val() &&
    isValidEmail($("#new-email").val())
  ) {
    data = api_request.change_mail_user($("#new-email").val());

    if (data.success) {
      $("#new-email").val("");
      $("#confirm-email").val("");
      alert("Votre email a bien été modifié");
    } else {
      alert(data.err);
    }
  } else {
    alert("Les deux emails ne correspondent pas ou l'email n'est pas valide.");
  }
}

function changePassword() {
  if (
    $("#newPassword").val() == $("#confirm-password").val() && isValidPassword($("#newPassword").val())
    // &&
    // isValidPassword($("#newPassword").val())
  ) {
    data = api_request.change_password_user();
    if (data.success) {
      $("#oldpassword").val("");
      $("#newPassword").val("");
      $("#confirm-password").val("");
      alert("Votre mot de passe a bien été modifié");
    } else {
      alert("L'ancien mot de passe est incorrect. (" + data.err + ")");
    }
  } else {
    alert(
      "Votre mot de passe n'est pas valide ou les deux mots de passe ne correspondent pas."    );
  }
}

// verify if the email is valid
function isValidEmail(email) {
  var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
}

// verify if the password is valid (at least 6 characters, 1 uppercase, 1 lowercase, 1 number)
function isValidPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/;
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
      $("#email").html(result.data.email);
      // convert sql dateRegister to date
      // var date = new Date(result.data.registerDate);
      // var dateRegister =
      //   date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // $("#dateRegister").html(dateRegister);

      // if (result.data.compte_level == 0) {
      //   $("#userLevel").html("Utilisateur");
      // } else if (result.data.compte_level == 1) {
      //   $("#userLevel").html("Récupartner");
      // } else {
      //   $("#userLevel").html("Compte de type : " + result.data.compte_level);
      // }
    },
  });

  $.ajax({
    url: "/api/user/get/subscription",
    type: "GET",
    success: function (data) {
      console.log("subscription: ", data.data);
      // if array is empty
      if (data.data.length == 0) {
        $("#subInfo").html("Aucune souscription");
      } else {
        $("#subInfo").html(
          data.data[0].price +
            "€ (" +
            data.data[0].subscription_duration +
            " mois)"
        );
        dateEnd = new Date(data.data[0].start_date);
        dateEnd.setUTCDate(
          dateEnd.getDay() + data.data[0].subscription_duration
        );
        if (dateEnd.getDate() > 30) {
          dateEnd.setDate(dateEnd.getDate() - 30);
          dateEnd.setMonth(dateEnd.getMonth() + 1);
        }

        if (dateEnd.getMonth() > 12) {
          dateEnd.setMonth(dateEnd.getMonth() - 12);
          dateEnd.setFullYear(dateEnd.getFullYear() + 1);
        }
        dateEnd =
          dateEnd.getDay() +
          "/" +
          dateEnd.getMonth() +
          "/" +
          dateEnd.getFullYear();
        $("#subRenouvellement").html(dateEnd);
      }
    },
  });

  /* LISTENERS */
  // when enter is pressed in newEmail focus confirmNewMail
  $("#new-email").keypress(function (e) {
    if (e.which == 13) {
      $("#confirm-email").focus();
    }
  });

  // when enter is pressed in confirmNewMail and newEmail and confirmNewMail have the same value call changeMail function
  $("#confirm-email").keypress(function (e) {
    if (e.which == 13) {
      changeMail();
    }
  });

  // when confirmNewMail is clicked call changeMail function
  $("#confirmButtonMailChange").click(function (e) {
    e.preventDefault();
    changeMail();
  });

  // when enter is pressed in oldPassword focus newPassword
  $("#oldpassword").keypress(function (e) {
    if (e.which == 13) {
      $("#newPassword").focus();
    }
  });

  // when enter is pressed in newPassword focus confirmNewPassword
  $("#newPassword").keypress(function (e) {
    if (e.which == 13) {
      $("#confirm-password").focus();
    }
  });

  // when enter is pressed in confirmNewPassword and newPassword and confirmNewPassword have the same value call changePassword function
  $("#confirm-password").keypress(function (e) {
    if (e.which == 13) {
      changePassword();
    }
  });

  // when confirmButtonPasswordChange is clicked call changePassword function
  $("#confirmButtonPasswordChange").click(function (event) {
    //prevent the page from refreshing
    event.preventDefault();
    changePassword();
  });

  // prevent default #noenterallowed
  $(".noenterallowed").keypress(function (e) {
    //if 13
    if (e.which == 13) {
      e.preventDefault();
    }
  });

  //#buttonContact mailto:recupusine@gmail.com
  $("#buttonContact").click(function (e) {
    console.log("buttonContact");
    window.location.href = "mailto:recupusine@gmail.com";
  });

  $("#returnBtn").click(function (e) {
    window.location.href = "partnerProfile";
  })
});
