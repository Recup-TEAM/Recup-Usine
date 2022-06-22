var all_entreprise = [];
//function get all enterprise
function getAllCollector() {
  data = api_request.getAllCollector();
  console.log(data);
  for (let i = 0; i < data.data.length; i++) {
    all_entreprise.push(data.data[i]);
  }
  pushToHtml(all_entreprise);
}

// function push to html
function pushToHtml(data) {
  /* html = <div class="overlap-group">
            <div class="logo"></div>
            <h1 class="name valign-text-middle calibri-bold-black-26px">Nom de l’entreprise</h1>
        </div>//*/
  //empty
  $("#entreprise-list").empty();
  for (let i = 0; i < data.length; i++) {
    let entreprise = data[i];
    if (entreprise.accepted == 0) {
      /* html = <div class="card mb-4 shadow-sm">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="my-0 font-weight-normal">Nom de l'entreprise</h5>
                <p class="adress">41 boulevard Vauban <br> Lille 59000</p>
                <button type="button" class="btn btn-sm btn-edit">Editer</button>
            </div>
        </div>*/
      html =
        ' <div class="col-lg-4 col-md-6 col-sm-12">\n' +
        '        <div class="card mb-4 shadow-sm hvr-grow-shadow cardEntreprise">\n' +
        '            <img class="card-img-top" src="'+ entreprise.img+'" alt="Card image cap">\n' +
        '            <div class="card-body">\n' +
        '                <h5 class="my-0 font-weight-normal">' +
        entreprise.name +
        "</h5>\n" +
        '                <p class="adress">' +
        entreprise.adresse +
        "</p>\n" +
        '                <button id="' + entreprise.id_entreprise + '" type="button" class="btn btn-sm btn-edit hvr-shutter-out-vertical btnAcceptRecupartenaire">Accepter <i class="fa fa-check" aria-hidden="true"></i></button> <button id="' + entreprise.id_entreprise + '" type="button" class="btn btn-sm btn-edit hvr-shutter-out-vertical btnShowProfile">Voir profil</button>\n' +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>";

      $("#entreprise-list").append(html);
    }
  }
  // listeenr click on cardEntreprise
  $(".btnShowProfile").click(function () {
    id = $(this).attr("id");
    let path = "partnerDemandsManagement";
    console.log("click on cardEntreprise id=" + id);
    //stock in localstorage
    localStorage.setItem("id_entreprise", id);
    localStorage.setItem("fromWhere", path);
    //redirect to specificEntrepriseManagement.html
    window.location.href = "specificPartnerManagement";
  });

  $(".btnAcceptRecupartenaire").click(function () {
    id = $(this).attr("id");

    let data = api_request.acceptRecupartenaire(id);
    console.log(data);
    if (data.success){
      location.reload();
    }
    else {
      alert(data.err);
    }
  });
}

// is connected
function isConnected() {
 $.ajax({
      url: "/api/user/get/compteLevel",
      type: "GET",
      success: (data) => {
        console.log(data);
        if (!data.success) {
          connected = false;
          window.location.href = "/";
        } else {
          if (data.data.compteLevel != 2) {
            console.log("compteLevel is false");
            admin = false;
            window.location.href = "/";
          }
        }
        return true
      },
    });
    return true;
}

// when the page is loaded
$(document).ready(function () {
  // if user is connected
  if (isConnected()) {
    getAllCollector();
  }

  // shearch and send to "push to html" when all_entreprise.name contains the value of the input or adresse tolowercase
  $("#search").keyup(function () {
    let value = $(this).val().toLowerCase();
    temp = [];
    for (let i = 0; i < all_entreprise.length; i++) {
      let entreprise = all_entreprise[i];
      if (
        entreprise.name.toLowerCase().includes(value) ||
        entreprise.adresse.toLowerCase().includes(value)
      ) {
        temp.push(entreprise);
      }
    }
    pushToHtml(temp);
  });
  $("#returnBtn").click(function (){
    window.location.href = "partnerManagement";
  })
});
