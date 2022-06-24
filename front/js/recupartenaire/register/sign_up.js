var img;
// funtion to hash the password
function hashPassword(password) {
  tmp = md5(password);
  console.log("hashPassword :", tmp);
  return tmp;
}

// verify if the email is valid
function isValidEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  tmp = re.test(String(email).toLowerCase());
  console.log("isValidEmail :", tmp);
  return tmp;
}

// verify if the password is valid (6 characters, 1 uppercase, 1 lowercase, 1 number)
function isValidPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/;
  tmp = re.test(String(password));
  console.log("isValidPassword :", tmp);
  return tmp;
} //amail@weyrd.space

// verify if the two passwords are the same
function isSamePassword(password, password2) {
  tmp = password === password2;
  console.log("isSamePassword ;", tmp);
  return tmp;
}


// register_function
function register_function() {
  var login = $("#email").val();
  var password = $("#password").val();
  var password2 = $("#confirm-password").val();

  var companyName = $("#company-name").val();
  var descriptionRegistration = $("#textarea").val();
  var entreprise_adresse = $("#adress").val();

  if (
    isValidEmail(login) &&
    isValidPassword(password) &&
    isSamePassword(password, password2)
  ) {
    logger.sign_up(
      entreprise_adresse,
      login,
      password,
      img,
      companyName,
      descriptionRegistration
    );
  } else {
    alert("Veuillez remplir correctement les champs");
  }
}

$(document).ready(function () {
  window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
      console.log(this.files[0]);
        if (this.files && this.files[0]) {
          url = URL.createObjectURL(this.files[0]);
          // upload image to server
          img = url;
          data = logger.upload_image(url);
          console.log("data :", data);
          
        }
    });
  });



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
  //focus  company-name
  $("#company-name").focus();

  // when enter is pressed on company-name field , focus on email
  $("#company-name").keypress(function (e) {
    if (e.which == 13) {
      $("#adress").focus();
    }
  });

  // when enter is pressed on adress field , focus on email
  $("#adress").keypress(function (e) {
    if (e.which == 13) {
      $("#email").focus();
    }
  });

  // when enter is pressed on email field , focus on password
  $("#email").keypress(function (e) {
    if (e.which == 13) {
      $("#password").focus();
    }
  });

  // when enter is pressed on password field , focus on confirm-password
  $("#password").keypress(function (e) {
    if (e.which == 13) {
      $("#confirm-password").focus();
    }
  });

  // when enter is pressed on confirm-password field , focus on textarea
  $("#confirm-password").keypress(function (e) {
    if (e.which == 13) {
      $("#textarea").focus();
    }
  });

  // when enter is pressed on textarea field call register_function
  $("#textarea").keypress(function (e) {
    if (e.which == 13) {
      $("#confirmButton").click();
    }
  });

  // when confirmButton is clicked call register_function
  $("#confirmButton").click(function () {
    register_function();
  });

  // prevent form submit on enter
  $("#form").submit(function (e) {
    e.preventDefault();
  });
});
