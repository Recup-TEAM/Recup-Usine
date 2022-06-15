var dataEntreprise, dataProduct;
/*  dataProduct = list of product Object { id_product: 26, id_entreprise: 9, quantity: 2349,
dimensions: "12x9x2",
id_entreprise: 9,
id_product: 26,
material: "Glass",
name: "Table_V4",
quantity: 2349,
quantity_to_collect: 0,
state: "Very Good"} 
Create a search function taht return a list of product object by string to find material or dimensions*/ 
// tolower exemple
// var string = "Glass"
// var string = string.toLowerCase()
function search(string) {
    var list = [];
    for (var i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].material.toLowerCase().includes(string) || dataProduct[i].dimensions.toLowerCase().includes(string)) {
            list.push(dataProduct[i]);
        }
    }
    listToHtml(list);
}



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
    let allMaterial = []
    for (let i = 0; i < list.length; i++) {
        // if material is not in allMaterial
        if (!allMaterial.includes(list[i].material)) {
            // add material to allMaterial
            allMaterial.push(list[i].material)
        }
        data_entreprise = get_img_entreprise(list[i].entreprise_id)
        imgEntreprise = data_entreprise.img
        adressEntreprise = data_entreprise.adresse
        html += `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-4 shadow-sm text-center hvr-grow-shadow">
            <img class="card-img-top" src="${imgEntreprise}" alt="Card image cap">
            <div class="card-body">
                <h3 class="my-0 font-weight-bold">${list[i].material}</h3>
                <p class="">Dimension : ${list[i].dimensions}</p>
                <p class="">Etat : ${list[i].state}</p>
                <p class="adress">${adressEntreprise}</p>
                <button type="button" class="btn btn-sm btn-edit hvr-shutter-out-vertical">Sélectionner</button>
            </div>  
        </div>
    </div>`
    }
     //emtpty then append listAnnonce
    $("#listAnnonce").empty();
    $("#listAnnonce").append(html)

    // #materialPicker option = allMaterial
    let htmlMaterial = ""
    for (let i = 0; i < allMaterial.length; i++) {
        htmlMaterial += `<option value="${allMaterial[i]}">${allMaterial[i]}</option>`

    }
    console.log(htmlMaterial);
    $("#materialPicker").empty();
    $("#materialPicker").append(htmlMaterial)


}

// when page ready
$(document).ready(function() {
    // get all entreprise
    dataEntreprise = getAllEntreprise().data
    // get all product
    dataProduct = getAllProduct().data
    listToHtml(dataProduct)

    // search function
    $("#search").on("keyup", function() {
        search($("#search").val())
    }
    )

});