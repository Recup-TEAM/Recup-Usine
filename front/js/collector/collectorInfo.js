// function list to html
function listToHtml(list) {
    console.log(list);
    let html = "";
    allMaterial = [];
    for (let i = 0; i < list.data.length; i++) {
        let name_entreprise = list.data[i].name;
        let trash_quantity = list.data[i].trash_quantity;
        let adress_entreprise = list.data[i].adresse;
        let img_entreprise = list.data[i].img;
        html += `<div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mb-4 shadow-sm hvr-grow-shadow cardEntreprise">
                <img class="card-img-top" alt="logoEntreprise" src="${img_entreprise}">
                <div class="card-body">
                    <h5 class="text-center">Nom de l'entreprise : ${name_entreprise}</h5>
                    <p class="quantity">Quantité : ${trash_quantity}</p>
                    <p class="type">Adresse : ${adress_entreprise}</p>
                </div>
            </div>
        </div>`;
    }
    //emtpty then append listAnnonce
    $("#collect-list").empty();
    $("#collect-list").append(html);
}

$(document).ready(function () {
    // ajax request to "/api/user/connected" to know if user if connected
    $.ajax({
        url: "/api/user/get/connected",
        type: "GET",
        success: (data) => {
            let divConnexion;
            if (!data.connected) {
                connected = false;
                if (window.location.href.split('/').length !== 4) {
                    window.location.href = '/'
                }
            } else {
                let name = data.email.split("@")[0];
            }
        }
    });

    $.ajax({
        url: "/api/collector/get/allEntrepriseWhoNeedCollect",
        type: "GET",
        success: (data) => {
            listToHtml(data);
        }
    });

    //event listener on initnaryBtn redirects to googlemaps
    $("#returnBtn").click(function () {
        window.location.href = "collector";
    });
});