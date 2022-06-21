var picker
function getInterval(){
    var a = picker.getStartDate();
    var b = picker.getEndDate();
    console.log("date star", a, "/ndate end", b);
}

//dataOrders list to display in the table
function getDataOrders(dataOrders){
    var data = [];
    for(var i = 0; i < dataOrders.length; i++){
        var order = dataOrders[i];
        //var user = request_getUserData(order.id_user);
        //var subscription = request_getUserSubscription(order.id_user);
        var order_date = new Date(order.order_date);
        var order_date_str = order_date.getDate() + "/" + (order_date.getMonth()+1) + "/" + order_date.getFullYear();

        html = `<tr class="alert my-auto">
                            <td>
                                <label class="checkbox-wrap checkbox-primary">  
                                    <input type="checkbox">
                                </label>
                            </td>
                            <td width="80px" class="my-auto">
                                <img class="img-fluid my-auto " src="../../img/elements/bois.jpg">
                            </td>
                            <td class="my-auto">
                                <div class="email">
                                    <h5 class="mb-0 mt-0">Titre de l'annonce</h5>
                                    <p class="pb-0 pt-0 mb-0 mt-0">41 boulevard Vauban 590000 LILLE</p>
                                </div>
                            </td>
                            <td class="quantity">
                                <p class="text-muted">${order_date_str}</p>
                            </td>
                            <td class="quantity">
                                <p>${order.price}€</p>
                            </td>
                            <td>
                                <h5 class="mb-0 mt-0">${order.quantity}m³</h5>
                            </td>
                        </tr>`;
        data.push(html);
    }
    return data;
}


//when the page is loaded
$(document).ready(function () {
    $("#datepicker").daterangepicker();
    picker = new easepick.create({
        element: "#datepicker",
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"
        ],
        zIndex: 10,
        lang: "fr-FR",
        format: "DD MMM YYYY",
        plugins: [
            "RangePlugin"
        ]
    })

    picker.on("rangeChange", getInterval());


    dataUSer = api_request.getUserData();
    console.log(dataUSer);

    id_user = 2
    dataOrders = api_request.getOrdersData(id_user);
    console.log(dataOrders);
    l = getDataOrders(dataOrders.data)
    console.log(l);
    $("#tableOrders").append(getDataOrders(dataOrders.data));


    // id_entreprise = 1
    // dataEntreprise = api_request.getAllEntrepriseOfUser(id_entreprise)
    // console.log("dataEntreprise", dataEntreprise);

    // allProducts = api_request.getProductsByEntrepriseId(id_entreprise)
    // console.log("allProducts", allProducts);
    
    
});

