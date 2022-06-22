function request_getProductById(id) {
  product = api_request.getProductById(id);
  console.log(product);
  if (product.success) {
    return product.data;
  }
  return [];
}

//function call api_request.getOneEntreprise(id)
function getOneEntreprise(id) {
  entreprise = api_request.getOneEntreprise(id);
  if (entreprise.success) {
    return entreprise.data;
  }
  return [];
}

function getImgOf(material) {
  imgMaterial = "bois.jpg";
  return "../../img/elements/" + material + ".jpg";
}


function getHtmlListOfOrders(data) {

   html = ""
   for(var i = 0; i < data.length; i++) {
        var product_id = data[i];
        product = request_getProductById(product_id)[0];
        entreprise = getOneEntreprise(product.id_entreprise)[0];
        html += `<tr class="alert my-auto" id="${product_id}">
        <td>
            <label class="checkbox-wrap checkbox-primary">
                <input type="checkbox">
            </label>
        </td>
        <td width="80px" class="my-auto">
            <img class="img-fluid my-auto " src="${getImgOf(
                product.material
                )}">
        </td>
        <td class="my-auto">
            <div class="email">
                <h5 class="mb-0 mt-0">${product.name.split("_")[0]}</h5>    
                <p class="pb-0 pt-0 mb-0 mt-0">${entreprise.adresse}</p>
            </div>
        </td>
        <td class="quantity">
            <span>${"1"}</span> 
        </td>
        <td>
            <h5 class="mb-0 mt-0">${product.dimensions}</h5>
        </td>
        <td>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true"><i class="fa fa-close"></i></span>
        </button>
        </td>
    </tr>`
    //#tableProducts
}

$("#tableProducts").html(html);

  // listner on .fa-close to delete the product from the list
    $(".fa-close").click(function () {
        var id = $(this).parents("tr").attr("id");
        console.log(id);
        $(this).parents("tr").remove();
        // delete from localStorage and listOfProduct
        listOfProduct = JSON.parse(localStorage.getItem("listOfProduct"));
        listOfProduct = listOfProduct.filter(function (item) {
            return parseInt(item) !== parseInt(id);
        }
        );
        localStorage.setItem("listOfProduct", JSON.stringify(listOfProduct));
    }
    );



}

//when the page is loaded
$(document).ready(function () {
  let listOfProduct = JSON.parse(localStorage.getItem("listOfProduct"));
  console.log(listOfProduct);

  listOfProduct = [30, 33, 40, 47, 52]
  localStorage.setItem("listOfProduct", JSON.stringify(listOfProduct));
  getHtmlListOfOrders(listOfProduct);

  //#goDevenirPauvre
    $("#goDevenirPauvre").click(function () {
       // window.location.href = "../../html/devenirPauvre.html"; //pixel
       // delete from localStorage
       
  let listOfProduct = JSON.parse(localStorage.getItem("listOfProduct"));
       toHistory = {}
       // update quantity of the product in db
       for(var i = 0; i < listOfProduct.length; i++) {
           data = api_request.updateProductQuantity(listOfProduct[i], 1); //quantity = 1
              console.log(data);
              toHistory[listOfProduct[i]] = "1"; //quantity = 1
        }
           // add in history of orders
            data = api_request.addToOrderHistory(toHistory);
            if (data.success) {
                console.log("add to history");
            }
            else {
                console.log(data.err);
            }
           
           //write a chuck noris joke
           // alert(chuckNorisJoke());
           localStorage.removeItem("listOfProduct");
    });

});
