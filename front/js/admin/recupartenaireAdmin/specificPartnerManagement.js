function isConnected() {
  data = api_request.isConnected();
  console.log(data);
  if (data.status == "success") {
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
  $("#email").html(data.data.email);
  return data;
}

function getSubscription(id) {
  let data = api_request.getSubscription(id);
  //#subRenouvellement

  if (data.data.length == 0) {
    $("#subRenouvellement").html("Aucune souscription");
  } else {
    console.log(data.data[0]);
    $("#subInfo").html(
      data.data[0].price + "€ (" + data.data[0].subscription_duration + " mois)"
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

    $("#subRenouvellement").html(dateEnd);
  }
  return data;
}

// get products by entreprise id
function getProductsByEntrepriseId(id) {
  let data = api_request.getProductsByEntrepriseId(id);
  // if
  if (data.data.length == 0) {
    $("#products").html("Aucun produit");
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
    $("#products").html(materials.join(", "));
    //#productscollected = quantity of each product
    let productscollected = 0;
    let productsTocollect = 0;
    for (let i = 0; i < data.data.length; i++) {
        productscollected += data.data[i].quantity;
        productsTocollect += data.data[i].quantity_to_collect;
        }
    $("#productscollected").html(productscollected);
    $("#productsTocollect").html(productsTocollect);  }


  return data;
}

//when the page is loaded
$(document).ready(function () {
  console.log("ready");
  // get id localstorage
  let id = localStorage.getItem("id_entreprise");
  id = 1;
  console.log(id);

  isConnected();
  entreprise_data = getOneEntreprise(id);
  id_user = entreprise_data.data[0].id_user;
  id_entreprise = entreprise_data.data[0].id_entreprise
  console.log(id_user);

  user_data = getUserById(id_user);
  console.log(user_data);

  subscription_data = getSubscription(id_user);
  console.log(subscription_data);

  products_data = getProductsByEntrepriseId(id);
  console.log(products_data);

  //onclick buttonEditProfil stock id_entreprise in localstorage
  $("#buttonEditProfil").click(function () {
    localStorage.setItem("id_entreprise", id_entreprise);
    window.location.href = "/adminHtml/recupartenaireAdminHtml/specificPartnerModificationManagement";
  });

  // #deleteProfil
  $("#deleteProfil").click(function () {
    //let data = api_request.deleteProfil(id_entreprise);
    console.log("deleteProfil a coder");
  })

  //#requestCollect
    // $("#requestCollect").click(function () {
    //     let data = api_request.requestCollect(id_entreprise);
    //     console.log(data);
    //     if (data.success) {
    //         alert("Demande de collecte envoyée");
    //     }
    //     else {
    //         alert(data.err);
    //     }
    // }
    // );
});
