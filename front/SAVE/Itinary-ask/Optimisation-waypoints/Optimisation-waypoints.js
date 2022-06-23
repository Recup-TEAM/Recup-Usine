// But du programme : créer le trajet le plus optimiser
// Comment : on calcul la distance entre l'origine et tout les points
// on se place à au point le plus proche puis on recalcul la distance avec les points restants
// on se place au plus proche et ainsi de suite.

var myPosition = "ISEN Lille, Lille";

var waypoint1 = "20 rue Claude Debussy, 59780, Baisieux";
var waypoint2 = "62 Rue du Port, Lille";
var waypoint3 = "31 Rue du Dr.Bouret, Marq-en-Baroeul";
var waypoint5 = "3 Boulevard montebello, Lille";
var waypoint6 = "Gare Lille Europe, Lille";
var waypoint7 = "2 Rue de wazemmes, Lille"

var listWaypoints = [
  '93 Rue Félix Faure, 59110 La Madeleine',
  "Rue de Versailles, 59650 Villeneuve-d'Ascq",
  '3 Rue Sébastien et Jacques Lorenzi, Place Générale Valérie André, 93440 Dugny',
  'Rue du Pic au Vent, 59810 Lesquin'
]
// DEBUT DE LA FONCTION ------------------------------------------------------------------------------------------------------------------

// PARAMETRAGE DE LA CARTE

var myLatLng = myPosition;
var mapOptions = {
    center: {lat: 50.6341809, lng: 3.0487116},
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// --------------------------------------------------------------------------------------------------------------------------------------
// CREATION DE LA MAP
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// CREATION D'UN OBJET POUR FAIRE LA REQUETE
var directionsService = new google.maps.DirectionsService();
// CREATION D'UN OBJET POUR AFFICHER LA ROUTE
var directionsDisplay = new google.maps.DirectionsRenderer();
// LIAISON AVEC LA CARTE
directionsDisplay.setMap(map);

// --------------------------------------------------------------------------------------------------------------------------------------
// DEFINITION DE LA FICTION DE CALCUL DE LA DISTANCE ENTRE 2 POINTS
async function calcRoute(point1, point2) {

    // CREATION DE LA REQUETE
    var request = {
        origin: point1,
        destination: point2,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }
    let data;

    // CALCULE DE LA ROUTE LA PLUS COURTE
    await directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // RECUPERATION DE LA DISTANCE
            const output = document.querySelector('#output');
            output.innerHTML = "Driving distance <i class='fas fa-road'></i> : " + 
            result.routes[0].legs[0].distance.value +  ".</div>";

            // AFFICHAGE DE LA ROUTE
            directionsDisplay.setDirections(result);

        } else {
            // SUPPRESSION DE LA ROUTE
            directionsDisplay.setDirections({ routes: [] });
            // CENTRAGE DE LA CRATE SUR L'ISEN
            map.setCenter(myLatLng);

            // MESSAGE EN CAS D'ERREUR
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }

        data = result.routes[0].legs[0].distance.value;
        return data
    });
    return data
}

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --------------------------------------------------------------------------------------------------------------------------------------
// TRI DE LA LISTE DE WAYPOINT POUR UN TRAJET OPTIMAL

async function triListeWaypoint(listWaypoints) {

    let orderedList = [];                       // Liste dans l'ordre optimal
    let position = myPosition;                  // Postion de départ            
    var listSize = listWaypoints.length - 1;

    while(listWaypoints.length > 2){            // Tant que la taille de la liste n'est pas 1
        for (let i = 0; i < listSize; i++) {    

            if (listWaypoints[i]){temp = listWaypoints[i]};
            for (let j = 0; j < (listWaypoints.length); j++) {  // On cherche la plus petite distance entre 
                                                                // notre position et les points de passage obligatoire
                    let dist1;
                    let dist2;

                    if(position != temp) {dist1 = await calcRoute(position, temp)} else {dist1 = 100000000} // On mesure les distances de 2 trjaets
                    if(position != listWaypoints[j+1]){dist2 = await calcRoute(position, listWaypoints[j])} else {dist2 = 100000000}

                    console.log("pos : ", position, "\ntemp : ", temp, "\ndist1 : ", dist1, 
                    "\npos : ", position, "\nlisteWJ+1 : ", listWaypoints[j],"\ndist2 : ", dist2, "\nlistwaypoint", listWaypoints);

                    if (dist1 > dist2 && dist1 != 0 && dist2 != 0) { // On garde le plus petit
                        
                        if (listWaypoints[j]){temp = listWaypoints[j]};
                    }
                    await timeout(1500);
            }
            orderedList.push(temp); // Le point correspondant au trajet le plus court est le premiers point de passage
            position = orderedList[i];  // On se place on point le plus proche
            let indexOf = listWaypoints.indexOf(temp);
            listWaypoints.splice(indexOf, 1); // On retire le point le plus proche pour ne pas boucler sur ce point
        }
    }
    orderedList.push(listWaypoints[0]); // Lorsque la liste de waypoint ne comprend plus qu'un seul point, c'est forcement le dernier
                                        // donc on l'ajoute à la liste ordonnée
    console.log("orderedList : ", orderedList, "\nWaypointlist : ", listWaypoints);
    return orderedList; // la fonction renvoie la liste ordonnée
}
//-------------------------------------------------------------------------------------------------------------------------------------
// CREATION DU LIEN RENVOYANT A L'ITINERAIRE MAPS

function createUrl(listWaypoints) {
    url = "https://www.google.com/maps/dir/?api=1&origin=ISEN+Lille%2CFrance&destination=ISEN+Lille%2CFrance&travelmode=driving&waypoints="
    console.log(listWaypoints.length); 
    for(i=0; i<listWaypoints.length; i++) {
        url += listWaypoints[i].replaceAll(" ","+");
        url += "%2CFrance%7C";
    } 
    url = url.slice(0, -3);
    return url
    }



// --------------------------------------------------------------------------------------------------------------------------------------
//AFFICHAGE DES RESULTATS DANS LA CONSOLE

document.addEventListener("DOMContentLoaded", function() {
    //call triListeWaypoint function
    triListeWaypoint(listWaypoints).then(function(result) {
        let URL = createUrl(result);
        console.log(URL);
    })          
});

//when the page is loaded
