// But du programme : créer le trajet le plus optimiser
// Comment : on calcul la distance entre l'origine et tout les points
// on se place à au point le plus proche puis on recalcul la distance avec les points restants
// on se place au plus proche et ainsi de suite.

var myPosition = "ISEN Lille, Lille";

var waypoint1 = "20 rue Claude Debussy, 59780, Baisieux";
var waypoint2 = "Lille Grand palais, Lille";
var waypoint3 = "Zoo de Lille, Lille";
var waypoint4 = "227 Rue de l'echoppette, 62400, Locon";
var waypoint5 = "Gare Lille Flandres, Lille";
var waypoint6 = "297 Chemin des Petits Mas, 13420, Gemenos";
var waypoint7 = "40 Rue Victor Hugo, Paris"

var listWaypoints = [waypoint1, waypoint2, waypoint3, waypoint4, waypoint5, waypoint6, waypoint7];

//javascript.js -------------------------------------------------------------------------------------------------------------------------

//set map options
var myLatLng = myPosition;
var mapOptions = {
    center: {lat: 50.6341809, lng: 3.0487116},
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
async function calcRoute(point1, point2) {
    //create request
    var request = {
        origin: point1,
        destination: point2,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }
    let data;
    //pass the request to the route method
    await directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + 
            document.getElementById("from").value + ".<br />To: " + 
            document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + 
            result.routes[0].legs[0].distance.value + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + 
            result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
        data = result.routes[0].legs[0].distance.value;
        return data
    });
    //console.log(data);
    return data
}
async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --------------------------------------------------------------------------------------------------------------------------------------
// TRI DE LA LISTE DE WAYPOINT POUR UN TRAJET OPTIMAL
async function triListeWaypoint(listWaypoints) {
    // ListWaypoint = [A, B, C, D, E];   (10 waypoints max)
    let orderedList = [];                       // liste ordonée
    let position = myPosition;
    let alreadyUsed = []
    var listSize = listWaypoints.length;

    while(listWaypoints.length > 2){
        for (let i = 0; i < listSize; i++) {

            if (listWaypoints[i]){temp = listWaypoints[i]};
            for (let j = 0; j < (listWaypoints.length - 1); j++) {

                    let dist1;
                    let dist2;

                    if(position != temp) {dist1 = await calcRoute(position, temp)} else {dist1 = 0}
                    if(position != listWaypoints[j+1]){dist2 = await calcRoute(position, listWaypoints[j+1])} else {dist2 = 0}

                    console.log("pos : ", position, "\ntemp : ", temp, "\ndist1 : ", dist1, 
                    "\npos : ", position, "\nlisteWJ+1 : ", listWaypoints[j+1],"\ndist2 : ", dist2);

                    console.log("alreadyUsed", alreadyUsed, !alreadyUsed.includes(temp));

                    if (dist1 > dist2 && dist1 != 0 && dist2 != 0) {
                        
                        if (listWaypoints[j+1]){temp = listWaypoints[j+1]};
                        alreadyUsed.push(temp);
                        console.log("temp : ", temp, "\nalreadyUsed : ", alreadyUsed);
                    }
                    await timeout(1500);
                    
                    
            }
            orderedList.push(temp);
            position = orderedList[i];
            let indexOf = listWaypoints.indexOf(temp);
            listWaypoints.splice(indexOf, 1);
        }
    }
    orderedList.push(listWaypoints);
    console.log("orderedList : ", orderedList, "\nWaypointlist : ", listWaypoints);
    return orderedList;
}
//-------------------------------------------------------------------------------------------------------------------------------------

//Vérification de l'affichage du HTML puis lancement du calcul de l'itinéraire
document.addEventListener("DOMContentLoaded", function() {
    //call triListeWaypoint function
    triListeWaypoint(listWaypoints).then(function(result) {
        console.log("result : ", result);
    })
               
});