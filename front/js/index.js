
    //when document is ready
    $(document).ready(function () {
        let socket = io();
        AOS.init();
  
        // ajax request to "/api/user/connected" to know if user if connected
        $.ajax({
          url: "/api/user/get/connected",
          type: "GET",
          success: (data) => {
            let divConnexion;
            if (!data.connected) {
              divConnexion =
                '<div class="loginButton">' +
                '<div class="loginContainer">' +
                '<div class="loginRectangle"></div>' +
                '<img class="loginIcon" src="../img/login.png"/>' +
                '<a href="../connexion" class="loginLink"><div class="login valign-text-middle">Connexion</div></a>' +
                "</div>" +
                "</div>";
                $("#buttonSignInSignOut").html(divConnexion);
  
            } else {
              //name = data.email split at @ first part
              let name = data.email.split("@")[0];
              divConnexion =
                '<div class="loginButton">' +
                '<div class="loginContainer">' +
                '<div class="loginRectangle"></div>' +
                //'<img class="loginIcon" src="../img/logout.png"/>' +
                '<div class="loginLink"><div class="login valign-text-middle">' + name + '</div>' +
                "</div>" +
                "</div>" +
                "</div>";
                $("#buttonSignInSignOut").html(divConnexion);
              
  
              //event listener on click on buttonSignInSignOut
              $("#buttonSignInSignOut").click(function () {
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
                      }
                  });
              });
          }
          },
        });

        // event lister click on becomeRecupartner
        $("#becomeRecupartner").click(function () {
            //redirect to becomeRecupartner
            window.location.href = "/becomeRecupartner";
        })

        //change cursor on hover on becomeRecupartner
        $(".recupartenairesButton").hover(function () {
            $(this).css("cursor", "pointer");
        }
        , function () {
            $(this).css("cursor", "default");
        }
        );
      });