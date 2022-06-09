// funtion to hash the password
function hashPassword(password) {
  return md5(password);
}

// verify if the email is valid
function isValidEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// verify if the password is valid (6 characters, 1 uppercase, 1 lowercase, 1 number)
function isValidPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return re.test(String(password));
}

// verify if the two passwords are the same
function isSamePassword(password, password2) {
  return password === password2;
}
// verify form file

$(document).ready(function () {
  $(document).on("click", "#confirmButton", function () {
    var login = $("#email").val();
    var password = $("#password").val();
    var password2 = $("#confirm-password").val();
    var companyName = $("#company-name").val()
    var textarea = $("#textarea").val();
    var companyName = $("#company-name").val();
    var formFile = $("#formFile").val();

    

    if (
      isValidEmail(login) &&
      isValidPassword(password) &&
      isSamePassword(password, password2)
    ) {
      logger.sign_up(login, password);
    } else {
      $("#error").html("Veuillez remplir correctement les champs");
      console.log("Veuillez remplir correctement les champs");
    }
  });
  //focus 
});
