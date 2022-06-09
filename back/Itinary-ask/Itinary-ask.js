
//set map options
var Myposition = { lat: 50.6341809, lng: 3.0487116 };
var mapOptions = {
    center: Myposition,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//carte google
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//création de directionService pour faire la requete
var directionsService = new google.maps.DirectionsService();

//création de directionDisplay pour afficher la route
var directionsDisplay = new google.maps.DirectionsRenderer();

//liage avec la map
directionsDisplay.setMap(map);


//Calcul de l'itinéraire
function calcRoute() {
    //création de la requete
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //Choix du mode de transport (ici voiture)
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>De : " + document.getElementById("from").value + ".<br />A : " + document.getElementById("to").value + ".<br /> Distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Durée <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(Myposition);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
