var dataEntreprise;

// get all entreprise
function getAllEntreprise() {
    data = api_request.getAllEntreprise();
    console.log(data)
    return data;
}

//get all product
function getAllProduct() {
    data = api_request.getAllProduct()
    console.log(data)
    return data
}

// get_img_entreprise
function get_img_entreprise(id) {
    // for all entreprise in dataEntreprise
    for (let i = 0; i < dataEntreprise.length; i++) {
        // if id is equal to id in dataEntreprise
        if (id == dataEntreprise[i].id) {
            // return img
            return dataEntreprise[i];
        }
    }
}

// function list to html
function listToHtml(list) {
    /* <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card mb-4 shadow-sm text-center hvr-grow-shadow">
        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg" alt="Card image cap">
        <div class="card-body">
          <h3 class="my-0 font-weight-bold">Titre annonce</h3>
          <p class="adress">41 boulevard Vauban <br> Lille 59000</p>
          <button type="button" class="btn btn-sm btn-edit hvr-shutter-out-vertical">Sélectionner</button>
        </div>
      </div>
    </div>*/
    let html = ""
    for (let i = 0; i < list.length; i++) {
        data_entreprise = get_img_entreprise(list[i].entreprise_id)
        imgEntreprise = data_entreprise.img
        adressEntreprise = data_entreprise.adresse
        html += `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-4 shadow-sm text-center hvr-grow-shadow">
            <img class="card-img-top" src="${imgEntreprise}" alt="Card image cap">
            <div class="card-body">
                <h3 class="my-0 font-weight-bold">${list[i].name}</h3>
                <p class="adress">${adressEntreprise}</p>
                <button type="button" class="btn btn-sm btn-edit hvr-shutter-out-vertical">Sélectionner</button>
            </div>  
        </div>
    </div>`
    }
     //append listAnnonce
    $("#listAnnonce").append(html)
}

// when page ready
$(document).ready(function() {
    // get all entreprise
    dataEntreprise = getAllEntreprise().data
    // get all product
    var dataProduct = getAllProduct()
    listToHtml(dataProduct.data)

});