var picker, allDataOrders, allEntreprises, allProducts;

// function call api_request.request_getProductById(id)
function request_getProductById(id) {
  product = api_request.getProductById(id);
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

//getImgOf
function getImgOf(material) {
  imgMaterial = "bois.jpg";
  return "../../img/elements/" + imgMaterial;
}

//dataOrders list to display in the table
function getDataOrders() {
  console.log("dataOrders", allDataOrders);
  var data = [];
  nbTot = 0;
  for (var i = 0; i < allDataOrders.length; i++) {
    var order = allDataOrders[i];
    var articles = order.articles;

    for (var [id_product, nb_product] of Object.entries(articles)) {
       product = allProducts[id_product];
       entreprise = allEntreprises[product.id_entreprise]

       order_date = new Date(order.date);
       order_date_str =
        order_date.getDate() +
        "/" +
        (order_date.getMonth() + 1) +
        "/" +
        order_date.getFullYear();

      html = `<tr class="alert my-auto">
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
                                    <h5 class="mb-0 mt-0">${
                                      product.name.split("_")[0]
                                    }</h5>
                                    <p class="pb-0 pt-0 mb-0 mt-0">${
                                      entreprise.adresse
                                    }</p>
                                </div>
                            </td>
                            <td class="quantity">
                                <p class="text-muted">${order_date_str}</p>
                            </td>
                            <td class="quantity">
                                <p>x${nb_product}</p>
                            </td>
                            <td>
                                <h5 class="mb-0 mt-0">${product.dimensions}</h5>
                            </td>
                        </tr>`;
      nbTot += nb_product;
      data.push(html);
    }
  }
  //#nbTot
  $("#nbTot").html(nbTot);
  return data;
}

function createTable(id_user, intervalDate) {
  console.log("createTable ->", id_user, intervalDate);
  dataOrders = api_request.getOrdersData(id_user, intervalDate);
  allDataOrders = dataOrders.data;
  //do request to stock allentreprises in format {1, "entreprise1"}
    allEntreprises = {};
    allProducts = {};
  for (var i = 0; i < allDataOrders.length; i++) {
    var order = allDataOrders[i];
    var articles = order.articles;
    for (var [id_product, nb_product] of Object.entries(articles)) {
        var product = request_getProductById(id_product)[0];
        var entreprise = getOneEntreprise(product.id_entreprise)[0];

        //if entreprise not in allEntreprises
        if (!(entreprise.id in allEntreprises)) {
            allEntreprises[entreprise.id_entreprise] = entreprise;
            }
        //if product not in allProducts
        if (!(product.id in allProducts)) {
            allProducts[product.id_product] = product;
            }
           
    }
}
    console.log("allEntreprises", allEntreprises);
    console.log("allProducts", allProducts);

  console.log(dataOrders);
  $("#tableOrders").html(getDataOrders());
}

//search from #search input in allDataOrders then $("#tableOrders").html(getDataOrders(data));
function search() {
  var search = $("#search").val();
  var data = [];
  for (var i = 0; i < allDataOrders.length; i++) {
    var order = allDataOrders[i];
    var articles = order.articles;

    for (var [id_product, nb_product] of Object.entries(articles)) {
      product = allProducts[id_product];
       entreprise = allEntreprises[product.id_entreprise]

      var order_date = new Date(order.date);
      var order_date_str =
        order_date.getDate() +
        "/" +
        (order_date.getMonth() + 1) +
        "/" +
        order_date.getFullYear();

      if (product.name.toLowerCase().includes(search.toLowerCase())) {
        html = `<tr class="alert my-auto">
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
                                    <h5 class="mb-0 mt-0">${
                                      product.name.split("_")[0]
                                    }</h5>
                                    <p class="pb-0 pt-0 mb-0 mt-0">${
                                      entreprise.adresse
                                    }</p>
                                </div>
                            </td>
                            <td class="quantity">
                                <p class="text-muted">${order_date_str}</p>
                            </td>
                            <td class="quantity">
                                <p>x${nb_product}</p>
                            </td>
                            <td>
                                <h5 class="mb-0 mt-0">${product.dimensions}</h5>
                            </td>
                        </tr>`;
        data.push(html);
      }
    }
    $("#tableOrders").html(data);
  }
}

//when the page is loaded
$(document).ready(function () {
  picker = new easepick.create({
    element: document.getElementById("datepicker"),
    css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"],
    lang: "fr-FR",
    startDate: /*last year format*/ new Date(
      new Date().getFullYear() - 1,
      0,
      1
    ),
    endDate: /*today*/ new Date(),
    format: "DD MMM YYYY",
    autoApply: false,
    plugins: ["RangePlugin"],
    setup(picker) {
      picker.on("select", (e) => {
        let startDate = picker.getStartDate("YYYY/MMM/DD");
        let endDate = picker.getEndDate("YYYY/MMM/DD");
        startDate_str =
          startDate.getFullYear() +
          "/" +
          (startDate.getMonth() + 1) +
          "/" +
          startDate.getDate();
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
        createTable(id_user, intervalDate);
      });
    },
  });

  dataUSer = api_request.getUserData();
  id_user = dataUSer.data.id;

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

  createTable(id_user, intervalDate);

    $("#search").keyup(function () {
        search();
        
})
});
