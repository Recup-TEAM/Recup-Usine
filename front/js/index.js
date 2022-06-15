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
        $("#profileInteraction").html(`<div class="btn-group" id="dropdownProfile">
                <button class="btn btn-connection calibri-regular-normal-white-22px hvr-sweep-to-right dropdown-toggle" type="button" data-toggle="dropdown">
                    ${name}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item hvr-sweep-to-right" href="#"><span class="fa fa-user"></span> Profile</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="#"><span class="fa fa-shopping-basket"></span> Panier</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="#"><span class="fa fa-history"></span> Historique</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item hvr-sweep-to-right" href="#" id="logoutButton"><span class="fa fa-sign-out"></span> Déconnexion</a>
                </div>
            </div>`);
        //event listener on click on buttonSignOut
        $("#logoutButton").click(function (){
          if (connected){
            logout();
          }
        });
      }
    },
  });

  //event listener on click on buttonSignIn
  $("#loginButton").click(function () {
    if (!connected) {
      login();
    }
  });

  // event lister click on becomeRecupartner
  $("#becomeRecupartner").click(function () {
    //redirect to becomeRecupartner
    window.location.href = "/becomeRecupartner";
  });

  
});
