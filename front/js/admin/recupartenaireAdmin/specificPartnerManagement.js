var allProducts, allDataOrders, allProductsBuy;
var allEntreprises, allProducts;
var allProductsListDate = [];
var allProductsListQuantity = [];
function isConnected() {
  data = api_request.isConnected();
  console.log(data);
  if (data.connected) {
    return true;
  } else {
    //redirect /
    //window.location.href = "/";
    console.log("not connected");
    // faire une verif compe admin ?
    return true;
  }
}

function getOneEntreprise(id) {
  let data = api_request.getOneEntreprise(id);
  //#nameEntreprise
  $("#nameEntreprise").html(data.data[0].name);
  return data;
}

function getUserById(id) {
  let data = api_request.getUserById(id);
  //#email
  $("#email").html("<font color='#999999'>Adresse mail : </font><br>" + data.data.email);
  return data;
}

function getSubscription(id) {
  let data = api_request.getSubscription(id);
  //#subRenouvellement

  if (data.data.length == 0) {
    $("#subRenouvellement").html("<font color='#999999'>Date de renouvellement : </font>" + "Aucune souscription");
        $("#subInfo").html("<font color='#999999'>Abonnement : </font>" + "0€");
  } else {
    console.log(data.data[0]);
    $("#subInfo").html("<font color='#999999'>Abonnement : </font>" + data.data[0].price + "€ (" + data.data[0].subscription_duration + " mois)"
    );

    let dateEnd = new Date(data.data[0].start_date);
    dateEnd.setUTCDate(dateEnd.getDay() + data.data[0].subscription_duration);
    if (dateEnd.getDate() > 30) {
      dateEnd =
        dateEnd.getDate() -
        30 +
        "/" +
        (dateEnd.getMonth() + 1) +
        "/" +
        dateEnd.getFullYear();
    }
    if (dateEnd.getMonth() > 12) {
      dateEnd.setMonth(dateEnd.getMonth() - 12);
      dateEnd.setFullYear(dateEnd.getFullYear() + 1);
    }
    dateEnd =
      dateEnd.getDay() +
      "/" +
      (dateEnd.getMonth() + 1) +
      "/" +
      dateEnd.getFullYear();

    $("#subRenouvellement").html("<font color='#999999'>Date de renouvellement : </font>" + dateEnd);
  }
  return data;
}

// get products by entreprise id
function getProductsByEntrepriseId(id) {
  let data = api_request.getProductsByEntrepriseId(id);
  // if
  allProducts = data.data;
  if (data.data.length == 0) {
    $("#products").html("<font color='#999999'>Type de déchets : </font>" + "Aucun produit");
    $("#productscollected").html("<font color='#999999'>Déchets collectés : </font>" + "0");
    $("#productsTocollect").html("<font color='#999999'>Déchets à collecter : </font>" + "0");

    
  } else {
    /*Object
            dimensions: "4x4x4"
            id_entreprise: 1
            id_product: 22
            material: "Wool"
            name: "Lit_V81b"
            quantity: 460
            state: "Good" */
    // take only materials
    let materials = [];
    for (let i = 0; i < data.data.length; i++) {
      if (!materials.includes(data.data[i].material)) {
        materials.push(data.data[i].material);
      }
    }
    //#products = materials
    $("#products").html("<font color='#999999'>Type de déchets : </font>" + materials.join(", "));
    //#productscollected = quantity of each product
    let productscollected = 0;
    let productsTocollect = 0;
    for (let i = 0; i < data.data.length; i++) {
        productscollected += data.data[i].quantity;
        productsTocollect += data.data[i].quantity_to_collect;
        }
    $("#productscollected").html("<font color='#999999'>Déchets collectés : </font>" + productscollected);
    $("#productsTocollect").html("<font color='#999999'>Déchets à collecter : </font>" + productsTocollect);  }

  chartDashboard();
  return data;
}

//when the page is loaded
$(document).ready(function () {
  console.log("ready");
  // get id localstorage
  let id = localStorage.getItem("id_entreprise");
  console.log(id);

  user = api_request.getDataUser()
  console.log(user);
  if(user.data.compte_level ==2){
    allEntreprise = api_request.getOneEntreprise(id);

  }
  else{

    user_id = user.data.id
    allEntreprise = api_request.getAllEntreprisesByUser(user_id)
  }

  isConnected();
  entreprise_data = allEntreprise.data[0];
  id_user = entreprise_data.id_user;
  
  id_entreprise = entreprise_data.id_entreprise

  user_data = getUserById(id_user);

  subscription_data = getSubscription(id_user);

  products_data = getProductsByEntrepriseId(id);


  //onclick buttonEditProfil stock id_entreprise in localstorage
  $("#buttonEditProfil").click(function () {
    localStorage.setItem("id_entreprise", id_entreprise);
    window.location.href = "/adminHtml/recupartenaireAdminHtml/specificPartnerModificationManagement";
  });

  // #deleteProfil
  $("#deleteProfil").click(function () {
    let data = api_request.deleteEntreprise(id_entreprise);
    console.log(data);
    if (data.success) {
      window.location.href = "/adminHtml/recupartenaireAdminHtml/partnerDemandsManagement";
    }
  })
  // #returnBtn
  $("#returnBtn").on("click", function (event) {
    if (typeof localStorage.getItem("fromWhere") !== "undefined"){
      window.location.href = localStorage.getItem("fromWhere");
    }
    else {
      window.location.href = "specificPartnerManagement";
    }
  });

});


// function call api_request.request_getProductById(id)
function request_getProductById(id) {
  product = api_request.getProductById(id);
  if (product.success) {
    return product.data;
  }
  return [];
}

//function call api_request.getOneEntreprise(id)
function rq_getOneEntreprise(id) {
  entreprise = api_request.getOneEntreprise(id);
  if (entreprise.success) {
    return entreprise.data;
  }
  return [];
}


function get_orderData(id_user) {
  console.log("get_orderData");

  startDate = /*last year format*/ new Date(new Date().getFullYear() - 1, 0, 1);
  startDate_str =
    startDate.getFullYear() +
    "/" +
    (startDate.getMonth() + 1) +
    "/" +
    startDate.getDate();

  endDate = /*today*/ new Date();
  endDate_str =
    endDate.getFullYear() +
    "/" +
    (endDate.getMonth() + 1) +
    "/" +
    endDate.getDate();

    intervalDate = {
      startDate: startDate_str,
      endDate: endDate_str,
    };
  
  console.log("get_orderData ->", id_user, intervalDate);
  dataOrders = api_request.getOrdersData(id_user, intervalDate);
  allDataOrders = dataOrders.data;
  //do request to stock allentreprises in format {1, "entreprise1"}
    allEntreprisesBuy = {};
    allProductsBuy = {};
    allProductsListName = [];
    allProductsListQuantity = [];

  
    
  for (var i = 0; i < allDataOrders.length; i++) {
    var order = allDataOrders[i];
    var articles = order.articles;
    nbTot = 0
    for (var [id_product, nb_product] of Object.entries(articles)) {
        var product = request_getProductById(id_product)[0];
        var entreprise = rq_getOneEntreprise(product.id_entreprise)[0];

        //if entreprise not in allEntreprises
        if (!(entreprise.id in allEntreprisesBuy)) {
          allEntreprisesBuy[entreprise.id_entreprise] = entreprise;
            }
        //if product not in allProducts
        if (!(product.id in allProductsBuy)) {
          allProductsBuy[product.id_product] = product;
            allProductsListQuantity.push(parseInt(nb_product));
            allProductsListName.push(product);
            console.log(allProductsListName, allProductsListQuantity);
            }

          
           
    }
}
    console.log("allProductsListDate", allProductsListName);
    console.log("allProductsListQuantity", allProductsListQuantity);
  console.log(dataOrders);
}



function chartDashboard(){
  get_orderData(id_user)
  buyedProductNameForChart = allProductsListName.map(product => product.material)
  console.log(allProductsListName);
  console.log(buyedProductNameForChart);
console.log(allProducts);
var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: buyedProductNameForChart,
          datasets: [{
              label: 'Quantité déchets commandés',
              data: allProductsListQuantity,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });


    /* 2eme dashboard */ 
    
const chart2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(chart2, {
    type: 'bar',
    data: {
        labels: allProducts.map(product => product.material + " (" + product.name + ")"),
        datasets: [{
            label: 'Quantité déchets collectés',
            data: allProducts.map(product => product.quantity),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}