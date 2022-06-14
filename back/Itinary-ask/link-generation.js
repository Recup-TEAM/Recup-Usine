// But de la fonction : générer le lien d'un itinéraire maps à partir d'une liste de waypoints

// Forme du lien :
// https://www.google.com/maps/dir/?api=1&origin=Paris%2CFrance&destination=Cherbourg%2CFrance&travelmode=driving&
// waypoints=Adresse-1%2CPays-1%7CAdresse-2%2CCPays-2

var Stop1 = "Lille Grand Palais Lille";
var Stop2 = "20 Rue Claude Debussy 50780 Baiseux";
var Stop3 = "Gare Lille Flandres Lille";
var listWaypoints = [Stop1, Stop2, Stop3];

function createUrl(listWaypoints) {
    url = "https://www.google.com/maps/dir/?api=1&origin=ISEN+Lille%2CFrance&destination=ISEN+Lille%2CFrance&travelmode=driving&waypoints="
    console.log(listWaypoints.length); 
    for(i=0; i<listWaypoints.length; i++) {
        url += listWaypoints[i].replaceAll(" ","+");
        url += "%2CFrance%7C";
        console.log(url);
    } 
    url = url.slice(0, -3);
    return url
    }

console.log(createUrl(listWaypoints));
