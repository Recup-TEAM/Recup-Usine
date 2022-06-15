// funtion to hash the password
function hashPassword(password) {
  return md5(password);
}

//function get email and password and send it to the server
function sign_in() {
  var login = $("#email").val();
  var password = $("#password").val();
  data = logger.sign_in(login, password);
  console.log(data);
  //data = logger.sign_in(login, hashPassword(password));
    if (data.success) {
        //reditect to /
        window.location.href = "/";
    } else {
        alert('email ou mot de passe incorrect');
    }
}

$(document).ready(function () {
  //if already logged in, redirect to home page
  $.ajax({
    url: "/api/user/get/connected",
    type: "GET",
    success: function (data) {
      if (data.connected) {
        window.location.href = "/";
      }
    },
  });

  // focus on the email input
  $("#email").focus();

  $(document).on("click", "#connectionButton", function () {
    sign_in();
  });

  // when enter is pressed on the password field
  $(document).on("keypress", "#password", function (e) {
    if (e.which == 13) {
      sign_in();
      // prevent the default behaviour of the enter key
      e.preventDefault();
    }
  });

  // when enter is pressed on the email field
  $(document).on("keypress", "#email", function (e) {
    if (e.which == 13) {
      // focus on the password field
      $("#password").focus();
      // do not submit the form
      return false;
    }
  });

  // prevendefault on #noenterallowed
  $(document).on("keypress", "#noenterallowed", function (e) {
    if (e.which == 13) {
      // do not submit the form
      return false;
    }
  }
  );

  // #letsgojemeco button lauch the sign_in function
  $(document).on("click", "#letsgojemeco", function () {
    sign_in();
  }
  );

});
