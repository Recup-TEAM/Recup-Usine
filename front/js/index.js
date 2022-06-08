var connected = true;
function logout() {
  //ajax request to "/api/user/logout" to logout user
  console.log("logout");
  $.ajax({
    url: "/api/user/logout",
    type: "POST",
    success: (data) => {
      //if logout success
      if (data.success) {
        //redirect to index
        window.location.href = "/";
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function login() {
  // redirect to login page
  window.location.href = "/recupartenaireHtml/login";
}

//when document is ready
$(document).ready(function () {
  //let socket = io();

  // ajax request to "/api/user/connected" to know if user if connected
  $.ajax({
    url: "/api/user/get/connected",
    type: "GET",
    success: (data) => {
      let divConnexion;
      if (!data.connected) {
        connected = false;
      } else {
        let name = data.email.split("@")[0];
        $("#loginButton").html("Logout : " +name);
      }
    },
  });

  //event listener on click on buttonSignInSignOut
  $("#loginButton").click(function () {
    if (connected) {
      logout();
    } else {
      login();
    }
  });

  // event lister click on becomeRecupartner
  $("#becomeRecupartner").click(function () {
    //redirect to becomeRecupartner
    window.location.href = "/becomeRecupartner";
  });

  
});
