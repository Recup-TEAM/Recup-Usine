var picker
function getInterval(){
    var a = picker.getStartDate();
    var b = picker.getEndDate();
    console.log("date star", a, "/ndate end", b);
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

    // id_entreprise = 1
    // dataEntreprise = api_request.getAllEntrepriseOfUser(id_entreprise)
    // console.log("dataEntreprise", dataEntreprise);

    // allProducts = api_request.getProductsByEntrepriseId(id_entreprise)
    // console.log("allProducts", allProducts);
    
    
});

