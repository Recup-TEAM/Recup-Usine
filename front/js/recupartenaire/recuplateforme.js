var dataEntreprise, dataProduct, allMaterial;
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
function search() {
  var listSearchProduct = [];
  var listMaterial = [];
  var listAdresse = [];
  var listEntreprise = [];

  listSearch = [];
  listSearchMaterial = [];
  listSearchAdresse = [];
  listSearchEntreprise = [];

  if ($("#search").val() != "") {
    listSearch.push($("#search").val());
  }

  if ($("#materialPicker").val() != "") {
    listSearchMaterial = $("#materialPicker").val();
  }

  for (let i = 0; i < $("#departPicker").val().length; i++) {
    if ($("#departPicker").val()[i].length == 1) {
      listSearchAdresse.push("0" + $("#departPicker").val()[i]);
    } else {
      listSearchAdresse.push($("#departPicker").val()[i]);
    }
  }

  for (let i = 0; i < $("#entreprisePicker").val().length; i++) {
    listSearchEntreprise.push($("#entreprisePicker").val()[i]);
  }

  /* verify search */
  if (listSearch.length != 0) {
    for (j = 0; j < listSearch.length; j++) {
      for (i = 0; i < dataProduct.length; i++) {
        if (
          dataProduct[i].material
            .toLowerCase()
            .includes(listSearch[j].toLowerCase()) ||
          dataProduct[i].dimensions
            .toLowerCase()
            .includes(listSearch[j].toLowerCase())
        ) {
          listSearchProduct.push(dataProduct[i]);
        }
      }
    }
  } else {
    listSearchProduct = dataProduct;
  }

  /* verify material */
  if (listSearchMaterial.length != 0) {
    for (j = 0; j < listSearchMaterial.length; j++) {
      for (i = 0; i < listSearchProduct.length; i++) {
        if (
          listSearchProduct[i].material
            .toLowerCase()
            .includes(listSearchMaterial[j].toLowerCase())
        ) {
          listMaterial.push(listSearchProduct[i]);
        }
      }
    }
  } else {
    listMaterial = listSearchProduct;
  }

  /* verify adress */
  if (listSearchAdresse.length != 0) {
    for (j = 0; j < listSearchAdresse.length; j++) {
      for (i = 0; i < listMaterial.length; i++) {
        data_entreprise = get_data_entreprise(listMaterial[i].id_entreprise);
        nbDepartement = data_entreprise.adresse.toLowerCase().split(" ");

        if (
          nbDepartement[nbDepartement.length - 1].includes(
            listSearchAdresse[j].toLowerCase()
          )
        ) {
          listAdresse.push(listMaterial[i]);
        }
      }
    }
  } else {
    listAdresse = listMaterial;
  }

  /* verify entreprise */
  if (listSearchEntreprise.length != 0) {
    for (j = 0; j < listSearchEntreprise.length; j++) {
      for (i = 0; i < listAdresse.length; i++) {
        data_entreprise = get_data_entreprise(listAdresse[i].id_entreprise);
        if (
          data_entreprise.id_entreprise == parseInt(listSearchEntreprise[j])
        ) {
          listEntreprise.push(listAdresse[i]);
        }
      }
    }
  } else {
    listEntreprise = listAdresse;
  }

  if (
    listEntreprise.length == 0 &&
    listAdresse.length == 0 &&
    listMaterial.length == 0 &&
    listSearchProduct.length == 0
  ) {
    listEntreprise = dataProduct;
  }

  listToHtml(listEntreprise);
}

// get all entreprise
function getAllEntreprise() {
  data = api_request.getAllEntreprise();
  console.log(data);
  return data;
}

//get all product
function getAllProduct() {
  data = api_request.getAllProduct();
  console.log(data);
  return data;
}

// get_img_entreprise
function get_data_entreprise(id) {
  // for all entreprise in dataEntreprise
  for (let i = 0; i < dataEntreprise.length; i++) {
    // if id is equal to id in dataEntreprise
    if (id == dataEntreprise[i].id_entreprise) {
      // return img
      return dataEntreprise[i];
    }
  }
}

// function add product to localStorage
function addProductToLocalStorage(product) {
  // .cardProduct on click log id_entreprise
  $(".cardProduct").on("click", function () {
    let id_product = $(this).attr("id_product");
    let listOfProduct = JSON.parse(localStorage.getItem("listOfProduct"));
    if (listOfProduct.includes(id_product)) {
      listOfProduct.splice(listOfProduct.indexOf(id_product), 1);
    } else {
      listOfProduct.push(id_product);
      // #product_id 
    }
    localStorage.setItem("listOfProduct", JSON.stringify(listOfProduct));
  });
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
  let html = "";
  allMaterial = [];
  for (let i = 0; i < list.length; i++) {
    // if material is not in allMaterial
    if (!allMaterial.includes(list[i].material)) {
      // add material to allMaterial
      allMaterial.push(list[i].material);
    }
    data_entreprise = get_data_entreprise(list[i].id_entreprise);
    imgEntreprise = data_entreprise.img;
    nomEntreprise = data_entreprise.name;
    adressEntreprise = data_entreprise.adresse;
    html += `<div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-4 shadow-sm text-center hvr-grow-shadow">
            <img class="card-img-top" src="${imgEntreprise}" alt="Card image cap">
            <div class="card-body">
                <h3 class="my-0 font-weight-bold">${list[i].material}</h3>
                <p class="">Dimension : ${list[i].dimensions}</p>
                <p class="">Entreprise : ${nomEntreprise}</p>
                <p class="">Quantité : ${list[i].quantity}</p>
                <p class="">Etat : ${list[i].state}</p>
                <p class="adress">${adressEntreprise}</p>
                <button type="button" class="btn btn-sm btn-edit hvr-shutter-out-vertical cardProduct" id="product_${list[i].id_product}" id_product="${list[i].id_product}">Sélectionner</button>
            </div>  
        </div>
    </div>`;
  }
  //emtpty then append listAnnonce
  $("#listAnnonce").empty();
  $("#listAnnonce").append(html);
  addProductToLocalStorage();
}

//get localStorage
function getLocalStorage() {
  if (localStorage.getItem("listOfProduct") != null) {
    let listOfProduct = JSON.parse(localStorage.getItem("listOfProduct"));
    console.log(listOfProduct);
  }
}
// when page ready
$(document).ready(function () {
  dataEntreprise = getAllEntreprise().data; // get all entreprise
  dataProduct = getAllProduct().data; // get all product
  listToHtml(dataProduct);
  localStorage.setItem("listOfProduct", JSON.stringify([]));

  // #materialPicker option = allMaterial
  let htmlMaterial = "";
  for (let j = 0; j < allMaterial.length; j++) {
    htmlMaterial += `<option value="${allMaterial[j]}">${allMaterial[j]}</option>`;
  }

  // empty then append htmlMaterial
  //selectpicker materialPicker
  $("#materialPicker").empty();
  $("select").append(htmlMaterial);
  $("#materialPicker").selectpicker("refresh");

  // generate departPicker
  // departements = list all this comment to string -> Ain,Aisne,Allier,Alpes-de-Haute-Provence,Hautes-Alpes,Alpes-Maritimes,Ardèche,Ardennes,Ariège,Aube,Aude,Aveyron,Bouches-du-Rhône,Calvados,Cantal,Charente,Charente-Maritime,Cher,Corrèze,Corse-du-Sud,Haute-Corse,Côte-d'Or,Côtes d'Armor,Creuse,Dordogne,Doubs,Drôme,Eure,Eure-et-Loir,Finistère,Gard,Haute-Garonne,Gers,Gironde,Hérault,Ille-et-Vilaine,Indre,Indre-et-Loire,Isère,Jura,Landes,Loir-et-Cher,Loire,Haute-Loire,Loire-Atlantique,Loiret,Lot,Lot-et-Garonne,Lozère,Maine-et-Loire,Manche,Marne,Haute-Marne,Mayenne,Meurthe-et-Moselle,Meuse,Morbihan,Moselle,Nièvre,Nord,Oise,Orne,Pas-de-Calais,Puy-de-Dôme,Pyrénées-Atlantiques,Hautes-Pyrénées,Pyrénées-Orientales,Bas-Rhin,Haut-Rhin,Rhône,Haute-Saône,Saône-et-Loire,Sarthe,Savoie,Haute-Savoie,Paris,Seine-Maritime,Seine-et-Marne,Yvelines,Deux-Sèvres,Somme,Tarn,Tarn-et-Garonne,Var,Vaucluse,Vendée,Vienne,Haute-Vienne,Vosges,Yonne,Territoire de Belfort,Essonne,Hauts-de-Seine,Seine-St-Denis,Val-de-Marne,Val-D'Oise,Guadeloupe,Martinique,Guyane,La Réunion,Mayotte
  let departements = [
    "Ain",
    "Aisne",
    "Allier",
    "Alpes-de-Haute-Provence",
    "Hautes-Alpes",
    "Alpes-Maritimes",
    "Ardèche",
    "Ardennes",
    "Ariège",
    "Aube",
    "Aude",
    "Aveyron",
    "Bouches-du-Rhône",
    "Calvados",
    "Cantal",
    "Charente",
    "Charente-Maritime",
    "Cher",
    "Corrèze",
    "Corse",
    "Côte-d'Or",
    "Côtes d'Armor",
    "Creuse",
    "Dordogne",
    "Doubs",
    "Drôme",
    "Eure",
    "Eure-et-Loir",
    "Finistère",
    "Gard",
    "Haute-Garonne",
    "Gers",
    "Gironde",
    "Hérault",
    "Ille-et-Vilaine",
    "Indre",
    "Indre-et-Loire",
    "Isère",
    "Jura",
    "Landes",
    "Loir-et-Cher",
    "Loire",
    "Haute-Loire",
    "Loire-Atlantique",
    "Loiret",
    "Lot",
    "Lot-et-Garonne",
    "Lozère",
    "Maine-et-Loire",
    "Manche",
    "Marne",
    "Haute-Marne",
    "Mayenne",
    "Meurthe-et-Moselle",
    "Meuse",
    "Morbihan",
    "Moselle",
    "Nièvre",
    "Nord",
    "Oise",
    "Orne",
    "Pas-de-Calais",
    "Puy-de-Dôme",
    "Pyrénées-Atlantiques",
    "Hautes-Pyrénées",
    "Pyrénées-Orientales",
    "Bas-Rhin",
    "Haut-Rhin",
    "Rhône",
    "Haute-Saône",
    "Saône-et-Loire",
    "Sarthe",
    "Savoie",
    "Haute-Savoie",
    "Paris",
    "Seine-Maritime",
    "Seine-et-Marne",
    "Yvelines",
    "Deux-Sèvres",
    "Somme",
    "Tarn",
    "Tarn-et-Garonne",
    "Var",
    "Vaucluse",
    "Vendée",
    "Vienne",
    "Haute-Vienne",
    "Vosges",
    "Yonne",
    "Territoire de Belfort",
    "Essonne",
    "Hauts-de-Seine",
    "Seine-St-Denis",
    "Val-de-Marne",
    "Val-D'Oise",
  ]; //, "Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte"]

  let htmlDepart = "";
  for (let i = 0; i < 94; i++) {
    htmlDepart += `<option value="${i + 1}">${i + 1} - ${
      departements[i]
    }</option>`;
  }
  // empty then append htmlDepart
  $("#departPicker").empty();
  $("#departPicker").append(htmlDepart);
  $("#departPicker").selectpicker("refresh");

  // #entreprisePicker option = allEntreprise
  let htmlEntreprise = "";
  for (let j = 0; j < dataEntreprise.length; j++) {
    htmlEntreprise += `<option value="${dataEntreprise[j].id_entreprise}">${dataEntreprise[j].name}</option>`;
  }
  // empty then append htmlEntreprise
  $("#entreprisePicker").empty();
  $("#entreprisePicker").append(htmlEntreprise);
  $("#entreprisePicker").selectpicker("refresh");

  // search function
  $("#search").on("keyup", function () {
    search();
  });

  // materialPicker on change search val
  $("#materialPicker").on("change", function () {
    search();
  });

  // departPicker on change search val
  $("#departPicker").on("change", function () {
    search();
  });

  // entreprisePicker on change search val
  $("#entreprisePicker").on("change", function () {
    search();
  });
});
