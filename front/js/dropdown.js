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
                if (window.location.href.split('/').length !== 4){
                    window.location.href = '/'
                }
            }
            else {
                let name = data.email.split("@")[0];

                $.ajax({
                    url:"/api/user/get/compteLevel",
                    type: "GET",
                    success: (dataAccLvl) => {
                        if (dataAccLvl.data.compteLevel === 0){
                            $("#profileInteraction").html(`<div class="btn-group" id="dropdownProfile">
                <button class="btn btn-connection calibri-regular-normal-white-22px hvr-sweep-to-right dropdown-toggle" type="button" data-toggle="dropdown">
                    ${name}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item hvr-sweep-to-right" href="/collectorHtml/collector"><span class="fa fa-user"></span> Profile</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item hvr-sweep-to-right" href="#" id="logoutButton"><span class="fa fa-sign-out"></span> Déconnexion</a>
                </div>
            </div>`);
                        }
                        else if (dataAccLvl.data.compteLevel === 1){
                            let currentPage = window.location.href.split('/').splice(window.location.href.split('/').length - 1, window.location.href.split('/').length);
                            if (currentPage[0] === "partnerProfile"){
                                $("#profileInteraction").html(`<div class="btn-group" id="dropdownProfile">
                <button class="btn btn-connection calibri-regular-normal-white-22px hvr-sweep-to-right dropdown-toggle" type="button" data-toggle="dropdown">
                    ${name}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/recuplateforme"><span class="fa fa-globe"></span> Recuplateforme</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/orderRecap"><span class="fa fa-shopping-basket"></span> Panier</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="#"><span class="fa fa-history"></span> Historique</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item hvr-sweep-to-right" href="#" id="logoutButton"><span class="fa fa-sign-out"></span> Déconnexion</a>
                </div>
            </div>`);
                            }
                            else if (currentPage[0] === "recuplateforme"){
                                $("#profileInteraction").html(`<div class="btn-group" id="dropdownProfile">
                <button class="btn btn-connection calibri-regular-normal-white-22px hvr-sweep-to-right dropdown-toggle" type="button" data-toggle="dropdown">
                    ${name}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/partnerProfile"><span class="fa fa-user"></span> Profile</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/orderRecap"><span class="fa fa-shopping-basket"></span> Panier</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="#"><span class="fa fa-history"></span> Historique</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item hvr-sweep-to-right" href="#" id="logoutButton"><span class="fa fa-sign-out"></span> Déconnexion</a>
                </div>
            </div>`);
                            }
                            else if (currentPage[0] === ""){
                                $("#profileInteraction").html(`<div class="btn-group" id="dropdownProfile">
                <button class="btn btn-connection calibri-regular-normal-white-22px hvr-sweep-to-right dropdown-toggle" type="button" data-toggle="dropdown">
                    ${name}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/partnerProfile"><span class="fa fa-user"></span> Profile</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/recuplateforme"><span class="fa fa-globe"></span> Recuplateforme</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/orderRecap"><span class="fa fa-shopping-basket"></span> Panier</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="#"><span class="fa fa-history"></span> Historique</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item hvr-sweep-to-right" href="#" id="logoutButton"><span class="fa fa-sign-out"></span> Déconnexion</a>
                </div>
            </div>`);
                            }
                        }
                        else {
                            $("#profileInteraction").html(`<div class="btn-group" id="dropdownProfile">
                <button class="btn btn-connection calibri-regular-normal-white-22px hvr-sweep-to-right dropdown-toggle" type="button" data-toggle="dropdown">
                    ${name}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item hvr-sweep-to-right" href="/recupartenaireHtml/partnerProfile"><span class="fa fa-user"></span> Profile</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/adminHtml/recuplateformeAdminHtml/recuplateformeManagement"><span class="fa fa-globe"></span> Recuplateforme</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/adminHtml/collectorAdminHtml/collectorManagement"><span class="fa fa-truck"></span> Collecteur</a>
                    <a class="dropdown-item hvr-sweep-to-right" href="/adminHtml/recupartenaireAdminHtml/partnerManagement"><span class="fa fa-handshake-o"></span> Recupartenaire</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item hvr-sweep-to-right" href="#" id="logoutButton"><span class="fa fa-sign-out"></span> Déconnexion</a>
                </div>
            </div>`);
                        }
                        //event listener on click on buttonSignOut
                        $("#logoutButton").click(function (){
                            if (connected){
                                logout();
                            }
                        });
                    },
                });
            }
        },
    });
});
