//upddate product informations
function updateProductInformations(dataProduct) {
  console.log(dataProduct);
  //#nameEntreprise
  $("#nameEntreprise").text(dataProduct.material);
  //#quantity
  $("#quantity").html("<font color='#999999'>Quantité : </font>" + dataProduct.quantity);
  //#volume
  $("#volume").html("<font color='#999999'>Dimension : </font>" + dataProduct.dimensions);
  //#descProduct
  $("#descProduct").html("<font color='#999999'>Description : </font>Produit originel : " + dataProduct.name + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Le Produit est " + dataProduct.state.toLowerCase());
}
//update entreprise informations
function updateEntrepriseInformations(dataEntreprise) {
    console.log(dataEntreprise);
    //#origin = adresse
    $("#origin").html("<font color='#999999'>Provenance : </font>" + dataEntreprise.name + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +dataEntreprise.adresse);
    //#imgEntreprise
    if (entreprise.img.startsWith("http")) {
            entreprise.img = entreprise.img;
        }
        //else entreprise.img starts with /
        else {
            entreprise.img = "../../img/entreprises/" + entreprise.img;
        }
    $("#imgEntreprise").attr("src", dataEntreprise.img);
}

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
    isConnected();
    
  // get id_product from localStorage
  var id_product = localStorage.getItem("id_product");
  console.log(id_product);

  // get product by id
  dataProduct = api_request.getOneProduct(id_product);
  console.log(dataProduct);
  updateProductInformations(dataProduct.data[0]);

  // get entreprise of product
  dataEntreprise = api_request.getOneEntreprise(
    dataProduct.data[0].id_entreprise
  );
  console.log(dataEntreprise);
    updateEntrepriseInformations(dataEntreprise.data[0]);


    // #buttonDeleteAnnonce onclick
    $("#buttonDeleteAnnonce").click(function () {
        // get id_product from localStorage 
        var id_product = localStorage.getItem("id_product");
        console.log(id_product);
        // delete product
        data = api_request.request_deleteProduct(id_product);
        console.log(data);
        if (data.success) {
          alert("Produit supprimé");
          // window.location.href = "/";
          window.location.href = "recuplateformeManagement";
        }
        else {
          alert(data.err);
        }
        // redirect to home page
    }
    );
    // #returnBtn onclick
    $("#returnBtn").click(function () {
            window.location.href = "recuplateformeManagement";
        }
    );
});
