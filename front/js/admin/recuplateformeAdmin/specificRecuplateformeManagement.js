//upddate product informations
function updateProductInformations(dataProduct) {
  console.log(dataProduct);
  //#nameEntreprise
  $("#nameEntreprise").text(dataProduct.name);
  //#quantity
  $("#quantity").text(dataProduct.quantity);
  //#volume
$("#volume").text(dataProduct.dimensions);
//#descProduct
$("#descProduct").text(dataProduct.material + " " + dataProduct.state);
}
//update entreprise informations
function updateEntrepriseInformations(dataEntreprise) {
    console.log(dataEntreprise);
    //#origin = adresse
    $("#origin").text(dataEntreprise.name + "\n" +dataEntreprise.adresse);
    //#imgEntreprise
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
        // redirect to home page
        // window.location.href = "recuplateformeManagement";
    }
    );
    // #returnBtn onclick
    $("#returnBtn").click(function () {
            window.location.href = "recuplateformeManagement";
        }
    );
});
