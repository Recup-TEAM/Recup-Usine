﻿
//Affichage de la carte et prise en compte des différents arrêts

var Myposition = new google.maps.LatLng(50.6341809, 3.0487116);

var Stop1 = "229 Rue de l'échopette locon"; // Arrêts de test
var Stop2 = "Zoo de lille";
var Stop3 = new google.maps.LatLng(50.63809, 3.067116);
var Stop4 = "20 rue claude Debussy baisieux";

var listWaypoint = [Stop1, Stop2, Stop3, Stop4]; // Liste contenant tous les arrêts à réaliser sur le trajet

var objectWaypoint = []; // Création de la liste contenant les arrêts avec la mise sous la bonne forme pour le waypoint (calcRoute)
for (let index = 0; index < listWaypoint.length; index++) {
    const element = listWaypoint[index];
    console.log(element); // vérification de la prise en compte de chaque adresse
    objectWaypoint.push({"location":element, "stopover":true})
    
}
var mapOptions = { // Affichage de la carte avec les options d'affichage
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
        origin: Myposition,
        destination: Myposition,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem:  google.maps.UnitSystem.METRIC,
        waypoints: objectWaypoint,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,      
    }

    //Passage de la requete à l'affichage de la carte
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Affichage de la route
            directionsDisplay.setDirections(result);
        } else {
            //Supprimer la route
            directionsDisplay.setDirections({ routes: [] });
            //Centrer la map sur Myposition
            map.setCenter(Myposition);

        }
    });

}

//Vérification de l'affichage du HTML puis lancement du calcul de l'itinéraire
document.addEventListener("DOMContentLoaded", function() {
    calcRoute();
  });