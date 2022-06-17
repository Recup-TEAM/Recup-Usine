var connected = true;
function login() {
  // redirect to login page
  window.location.href = "/recupartenaireHtml/login";
}

//when document is ready
$(document).ready(function () {
  //event listener on click on buttonSignIn
  $("#loginButton").click(function () {
    if (!connected) {
      login();
    }
  });

  // event lister click on becomeRecupartner
  $("#becomeRecupartner").click(function () {
    //redirect to becomeRecupartner
    window.location.href = "/recupartenaireHtml/register";
  });

  
});
