// But du programme : créer le trajet le plus optimiser
// Comment : on calcul la distance entre l'origine et tout les points
// on se place à au point le plus proche puis on recalcul la distance avec les points restants
// on se place au plus proche et ainsi de suite.

var myPosition = "ISEN Lille, Lille";

var waypoint1 = "20 rue Claude Debussy, 59780, Baisieux";
var waypoint2 = "Lille Grand palais, Lille";
var waypoint3 = "Zoo de Lille, Lille";
var waypoint4 = "267 Rue de l'echoppette, 62400, Locon";
var waypoint5 = "Gare Lille Flandres, Lille";

var listWaypoints = [waypoint1, waypoint2, waypoint3, waypoint4, waypoint5];

var mapOptions = {
    center: { lat: 50.634742, lng: 3.048682 },
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: myPosition,
        destination: waypoint4,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.value + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        }
    });
    return result.routes[0].legs[0].distance.value
}
// -------------------------------------------------------------------------------------------------------------------------------------

// définiton de la fontion de calcule de distance
function calcDist(orgin, destination){


}

// --------------------------------------------------------------------------------------------------------------------------------------

// TRI DE LA LISTE DE WAYPOINT POUR UN TRAJET OPTIMAL

// ListWaypoint = [A, B, C, D, E];   (10 waypoints max)
var orderedList = [];                       // liste ordonée
var temp = listWaypoints[0];                // variable de stockage temporaire

for (let i = 0; i < listWaypoints.length; i++) {
    for (let j = 0; j < (listWaypoints.length - 1); j++) {
        if (calcDist(position, temp) > calcDist(position, listWaypoints[j+1])){
            temp = listWaypoints[j+1];
        }
        orderedList[i] = temp;
    }
}




//-------------------------------------------------------------------------------------------------------------------------------------

//Vérification de l'affichage du HTML puis lancement du calcul de l'itinéraire
document.addEventListener("DOMContentLoaded", function() {
    calcRoute();
  });