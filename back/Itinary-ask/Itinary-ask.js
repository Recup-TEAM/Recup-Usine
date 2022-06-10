
//set map options
var Myposition = new google.maps.LatLng(50.6341809, 3.0487116);
var Stop1 = new google.maps.LatLng(50.63409, 3.04116);
var Stop2 = new google.maps.LatLng(50.6341809, 3.0387116);
var Stop3 = new google.maps.LatLng(50.63809, 3.067116);
var Stop4 = "20 rue claude Debussy baisieux";
var listWaypoint = [Stop1, Stop2, Stop3, Stop4];
var objectWaypoint = [];
for (let index = 0; index < listWaypoint.length; index++) {
    const element = listWaypoint[index];
    console.log(element);
    objectWaypoint.push({"location":element, "stopover":true})
    
}
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
        origin: Myposition,
        destination: Myposition,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem:  google.maps.UnitSystem.METRIC,
        waypoints: objectWaypoint,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,      
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(Myposition);

        }
    });

}

document.addEventListener("DOMContentLoaded", function() {
    calcRoute();
  });